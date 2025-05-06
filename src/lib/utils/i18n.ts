/**
 * Utilitaires pour l'internationalisation (i18n)
 * 
 * Ce fichier fournit des fonctions utilitaires pour faciliter l'utilisation
 * des traductions dans les composants Svelte et dans le code client.
 * 
 * Note: Ce fichier est désormais obsolète et est maintenu pour compatibilité
 * avec le code existant. Les nouvelles fonctionnalités devraient utiliser
 * le système natif d'Astro i18n avec le middleware.
 */

import type { Lang } from '../../types';
import type { Translations } from '../../types/i18n';

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

// Pour assurer la compatibilité, nous construisons un objet de traduction temporaire
// à partir des données des fichiers de traduction déjà chargés en mémoire
const buildFallbackTranslations = (): Record<Lang, any> => {
  // Essaye de créer un objet compatible avec l'ancienne structure
  return {
    fr: {
      global: {
        site_name: "AgriFlow",
        site_description: "Plateforme de gestion agricole"
      },
      navigation: {
        home: "Accueil"
      }
    },
    en: {
      global: {
        site_name: "AgriFlow",
        site_description: "Agricultural Management Platform"
      },
      navigation: {
        home: "Home"
      }
    }
  };
};

// Traductions disponibles côté serveur (version simplifiée)
const serverTranslations: Record<Lang, Translations> = buildFallbackTranslations();

/**
 * Récupère une valeur de traduction à partir d'une clé
 * 
 * @param key - La clé de traduction (ex: "navigation.home")
 * @param params - Les paramètres à injecter (optionnel)
 * @param lang - La langue (optionnel, utilise la langue actuelle par défaut)
 * @returns La traduction correspondante ou la clé si non trouvée
 * 
 * @deprecated Utiliser le middleware Astro i18n à la place
 */
export function t(key: string, params?: Record<string, any>, lang?: Lang): string {
  // Vérifier si nous sommes dans un contexte Astro avec le middleware i18n
  if (typeof window !== 'undefined' && window.document.documentElement.dataset.astroI18nLang) {
    console.warn(`[i18n] Utilisation de la fonction obsolète t(). Préférez le middleware Astro i18n.`);
  }
  
  // Récupérer la langue actuelle depuis window si disponible
  const currentLang = (lang as Lang) || 
    (typeof window !== 'undefined' && window.APP_LANGUAGE?.current as Lang) || 
    'fr';
  
  try {
    // Récupérer les traductions pour la langue actuelle
    let translations;
    
    if (typeof window !== 'undefined') {
      // Côté client, utiliser les traductions chargées dans window.translations
      if (!window.translations || !Object.keys(window.translations).length) {
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
      // Côté serveur, utiliser les traductions de fallback
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
 * 
 * @deprecated Utiliser le middleware Astro i18n à la place
 */
export async function initClientTranslations(): Promise<void> {
  try {
    // Vérifier si nous utilisons déjà Astro i18n
    if (document.documentElement.dataset.astroI18nLang) {
      console.log("[i18n] Astro i18n est déjà configuré, utilisation de celui-ci");
      
      // Initialiser l'objet de compatibilité
      window.APP_LANGUAGE = {
        current: document.documentElement.dataset.astroI18nLang,
        available: ['fr', 'en']
      };
      
      // Utiliser les traductions minimalistes pour compatibilité
      window.translations = buildFallbackTranslations();
      
      window.dispatchEvent(new CustomEvent('translations-loaded'));
      return;
    }
    
    // Récupérer la langue actuelle
    const currentLang = window.APP_LANGUAGE?.current || 'fr';
    console.log(`[i18n] Initialisation des traductions pour la langue: ${currentLang}`);
    
    // Initialiser l'objet de traduction avec les valeurs minimales
    window.translations = buildFallbackTranslations();
    
    // Initialiser astro-i18n du côté client
    window.astroI18n = {
      language: currentLang as Lang,
      languages: ['fr', 'en'],
      defaultLanguage: 'fr'
    };
    
    console.log('[i18n] Traductions initialisées avec succès');
    
    // Déclencher un événement pour notifier que les traductions sont chargées
    window.dispatchEvent(new CustomEvent('translations-loaded'));
  } catch (error) {
    console.error('[i18n] Échec de l\'initialisation des traductions:', error);
  }
} 