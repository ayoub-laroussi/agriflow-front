/**
 * Utilitaires pour l'internationalisation (i18n)
 * 
 * Ce fichier fournit des fonctions utilitaires pour faciliter l'utilisation
 * des traductions dans les composants Svelte et dans le code client.
 */

import type { Lang } from '../../types';
import type { Translations } from '../../types/i18n';

// Importer les fichiers de traduction directement pour le rendu côté serveur
import frTranslations from '../../i18n/fr.json';
import enTranslations from '../../i18n/en.json';

// Définir l'interface de la fenêtre pour TypeScript
declare global {
  interface Window {
    APP_LANGUAGE: {
      current: string;
      available: string[];
    };
    translations: Record<string, Record<string, string>>;
    astroI18n?: {
      language: Lang;
      languages: Lang[];
      defaultLanguage: Lang;
    };
  }
}

// Traductions disponibles côté serveur
const serverTranslations: Record<Lang, Translations> = {
  fr: frTranslations as Translations,
  en: enTranslations as Translations
};

/**
 * Récupère une valeur de traduction à partir d'une clé
 * 
 * @param key - La clé de traduction (ex: "navigation.home")
 * @param params - Les paramètres à injecter (optionnel)
 * @param lang - La langue (optionnel, utilise la langue actuelle par défaut)
 * @returns La traduction correspondante ou la clé si non trouvée
 */
export function t(key: string, params?: Record<string, any>, lang?: Lang): string {
  // Récupérer la langue actuelle depuis window si disponible
  const currentLang = (lang as Lang) || 
    (typeof window !== 'undefined' && window.APP_LANGUAGE.current as Lang) || 
    'fr';
  
  try {
    // Récupérer les traductions pour la langue actuelle
    let translations;
    
    if (typeof window !== 'undefined') {
      // Côté client, utiliser les traductions chargées dans window.translations
      if (!Object.keys(window.translations).length) {
        // Si les traductions client ne sont pas encore chargées, utiliser celles du serveur
        translations = serverTranslations[currentLang];
        if (!translations) {
          console.warn(`No translations found for language: ${currentLang}`);
          return key;
        }
      } else {
        translations = window.translations[currentLang];
      }
    } else {
      // Côté serveur, utiliser les traductions importées directement
      translations = serverTranslations[currentLang];
    }
    
    if (!translations) {
      console.warn(`No translations found for language: ${currentLang}`);
      return key;
    }
    
    // Parcourir l'objet de traduction en suivant le chemin de clés
    const keys = key.split('.');
    let result: any = translations;
    
    for (const k of keys) {
      if (!result || result[k] === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
      result = result[k];
    }
    
    // Si le résultat est une chaîne, interpoler les paramètres si nécessaire
    if (typeof result === 'string') {
      return params ? interpolateParams(result, params) : result;
    }
    
    return key;
  } catch (error) {
    console.error('Error getting translation:', error);
    return key;
  }
}

/**
 * Remplace les paramètres dans une chaîne de traduction
 * 
 * @param text - Le texte contenant les placeholders {param}
 * @param params - Les paramètres à injecter
 * @returns La chaîne avec les paramètres remplacés
 */
function interpolateParams(text: string, params: Record<string, any>): string {
  return text.replace(/{([^{}]*)}/g, (match, key) => {
    const value = params[key];
    return value !== undefined ? String(value) : match;
  });
}

/**
 * Initialise les traductions côté client
 * Cette fonction est appelée dans le Layout.astro
 */
export async function initClientTranslations(): Promise<void> {
  try {
    // Récupérer la langue actuelle
    const currentLang = window.APP_LANGUAGE.current || 'fr';
    console.log(`[i18n] Initialisation des traductions pour la langue: ${currentLang}`);
    
    // Charger les fichiers de traduction
    console.log('[i18n] Chargement des fichiers de traduction...');
    const responses = await Promise.all([
      fetch('/src/i18n/fr.json'),
      fetch('/src/i18n/en.json')
    ]);
    
    if (!responses.every(response => response.ok)) {
      throw new Error('Failed to fetch translations');
    }
    
    // Analyser les réponses JSON
    const [frTranslations, enTranslations] = await Promise.all(
      responses.map(response => response.json())
    );
    
    // Stocker les traductions dans window
    window.translations = {
      fr: frTranslations,
      en: enTranslations
    } as Record<string, Record<string, string>>;
    
    // Initialiser astro-i18n du côté client
    window.astroI18n = {
      language: currentLang as Lang,
      languages: ['fr', 'en'],
      defaultLanguage: 'fr'
    };
    
    console.log('[i18n] Traductions initialisées avec succès');
    console.log(`[i18n] Langues disponibles: ${window.APP_LANGUAGE.available.join(', ')}`);
    console.log(`[i18n] Langue actuelle: ${window.APP_LANGUAGE.current}`);
    
    // Déclencher un événement pour notifier que les traductions sont chargées
    window.dispatchEvent(new CustomEvent('translations-loaded'));
  } catch (error) {
    console.error('[i18n] Échec de l\'initialisation des traductions:', error);
  }
} 