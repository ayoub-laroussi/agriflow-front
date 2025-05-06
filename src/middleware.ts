import { defineMiddleware } from 'astro:middleware';
import type { AstroGlobal } from 'astro';

// Types pour les traductions
type TranslationSection = Record<string, any>;
type TranslationsCache = {
  fr: Record<string, any> | null;
  en: Record<string, any> | null;
};

/**
 * Fusionne profondément deux objets
 * @param target L'objet cible
 * @param source L'objet source
 * @returns Un nouvel objet avec les propriétés des deux objets fusionnées
 */
function deepMerge(target: Record<string, any>, source: Record<string, any>): Record<string, any> {
  // Créer une copie de l'objet cible pour éviter de le modifier
  const output = { ...target };
  
  // Si la source n'est pas un objet, retourner la source
  if (!isObject(source) || !isObject(target)) {
    return source;
  }
  
  // Parcourir les clés de l'objet source
  Object.keys(source).forEach(key => {
    // Si la clé existe dans la cible et que les deux valeurs sont des objets
    if (isObject(source[key]) && key in target && isObject(target[key])) {
      // Récursion pour fusionner les objets imbriqués
      output[key] = deepMerge(target[key], source[key]);
    } else {
      // Sinon, affecter directement la valeur de la source
      output[key] = source[key];
    }
  });
  
  return output;
}

/**
 * Vérifie si une valeur est un objet
 * @param item La valeur à vérifier
 * @returns true si la valeur est un objet, false sinon
 */
function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item);
}

// Structure pour charger dynamiquement les fichiers de traduction par section
const loadTranslations = (locale: string): { translations: Record<string, any>; flattenedTranslations: Record<string, any> } => {
  // Utiliser des chemins absolus pour le chargement des fichiers
  const commonFiles = import.meta.glob('/src/i18n/*/common/*.json', { eager: true });
  const adminFiles = import.meta.glob('/src/i18n/*/admin/*.json', { eager: true });
  const pagesFiles = import.meta.glob('/src/i18n/*/pages/**/*.json', { eager: true });
  
  // Création d'un objet qui contiendra toutes les traductions
  const translations: Record<string, any> = {};
  
  // Fonction pour ajouter les traductions dans l'objet
  const processFiles = (files: Record<string, any>, localeToLoad: string) => {
    for (const path in files) {
      if (path.includes(`/${localeToLoad}/`)) {
        const content = files[path].default || files[path];
        
        // Extraire le nom de section à partir du chemin du fichier
        const pathParts = path.split('/');
        const fileNameWithExt = pathParts[pathParts.length - 1];
        const fileName = fileNameWithExt.replace('.json', '');
        
        // Extraire le type de section (common, admin, pages)
        const sectionType = pathParts[pathParts.findIndex(part => part === localeToLoad) + 1];
        
        // Construire la structure des traductions
        if (sectionType === 'common') {
          // Les fichiers common sont chargés directement à la racine de l'objet de traduction
          translations[fileName] = content;
        } else if (sectionType === 'pages') {
          // Pour les fichiers de pages, on utilise leur nom comme préfixe
          if (!translations[fileName]) {
            translations[fileName] = {};
          }
          
          // Si le chemin contient des sous-dossiers (par exemple, features/crop_management)
          const pagePath = pathParts.slice(pathParts.findIndex(part => part === 'pages') + 1, -1);
          
          if (pagePath.length > 0) {
            // Si on a un sous-dossier, on le met comme parent
            const subdir = pagePath[0];
            if (!translations[subdir]) {
              translations[subdir] = {};
            }
            translations[subdir] = deepMerge(translations[subdir], content);
          } else {
            // Sinon, on fusionne directement avec le fichier principal
            translations[fileName] = deepMerge(translations[fileName], content);
          }
        } else if (sectionType === 'admin') {
          // Pour les fichiers admin, on les met dans un objet "admin"
          if (!translations.admin) {
            translations.admin = {};
          }
          translations.admin[fileName] = content;
        }
      }
    }
  };
  
  // Charger et traiter les fichiers par section
  processFiles(commonFiles, locale);
  processFiles(adminFiles, locale);
  processFiles(pagesFiles, locale);
  
  // Créer un objet plat avec toutes les traductions pour faciliter l'accès
  const flattenedTranslations: Record<string, any> = {};
  
  // Fonction pour aplatir les traductions
  const flattenTranslations = (obj: Record<string, any>, prefix: string = '') => {
    for (const key in obj) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (isObject(obj[key])) {
        flattenTranslations(obj[key], newKey);
      } else {
        flattenedTranslations[newKey] = obj[key];
      }
    }
  };
  
  // Aplatir les traductions
  flattenTranslations(translations);
  
  console.log(`[i18n] Loaded translations for locale ${locale}:`, Object.keys(flattenedTranslations).length, "keys");
  
  return { translations, flattenedTranslations };
};

// Cache pour les traductions chargées
const translationsCache: {
  fr: { translations: Record<string, any>; flattenedTranslations: Record<string, any> } | null;
  en: { translations: Record<string, any>; flattenedTranslations: Record<string, any> } | null;
} = {
  fr: null,
  en: null
};

export const onRequest = defineMiddleware(async (context, next) => {
  // Récupérer la locale actuelle à partir de l'URL ou utiliser la locale par défaut (fr)
  const defaultLocale = 'fr';
  const currentLocale = context.url.pathname.split('/')[1] === 'en' ? 'en' : defaultLocale;
  
  // Charger les traductions depuis le cache ou les charger et mettre en cache
  if (!translationsCache[currentLocale]) {
    translationsCache[currentLocale] = loadTranslations(currentLocale);
  }
  
  // Stocker les traductions dans locals pour les rendre accessibles partout
  context.locals.t = (key: string): string => {
    const { translations, flattenedTranslations } = translationsCache[currentLocale]!;
    
    // Vérifier si la clé existe directement dans les traductions aplaties
    if (flattenedTranslations && flattenedTranslations[key] !== undefined) {
      return flattenedTranslations[key];
    }
    
    // Si c'est une clé composée, vérifier chaque niveau dans l'objet original
    const keys = key.split('.');
    let value: any = translations;
    
    // Parcourir l'objet de traduction pour trouver la valeur
    for (const k of keys) {
      if (!value || value[k] === undefined) {
        console.warn(`[i18n] Translation key not found: ${key}`);
        return key; // Clé non trouvée, retourner la clé elle-même
      }
      value = value[k];
    }
    
    return typeof value === 'string' ? value : key;
  };
  
  // Continuer le traitement de la requête
  return next();
}); 