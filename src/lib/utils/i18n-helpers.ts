/**
 * Fonctions d'aide pour l'internationalisation (i18n)
 * 
 * Ces fonctions facilitent l'utilisation de l'internationalisation dans les
 * pages Astro sans avoir à dupliquer les pages pour chaque langue.
 */

import type { AstroGlobal } from 'astro';
import type { Lang } from '../../types';

/**
 * Initialise le contexte i18n pour une page
 * 
 * Cette fonction fournit les outils nécessaires pour afficher une page dans
 * différentes langues sans avoir à dupliquer le code pour chaque langue.
 * 
 * @param Astro - Le contexte Astro (passez simplement Astro comme paramètre)
 * @param pageKey - La clé qui préfixe les traductions de cette page
 * @returns Un objet contenant le contexte i18n pour la page
 * 
 * @example
 * ```astro
 * ---
 * import { initI18nContext } from '../lib/utils/i18n-helpers';
 * const { t, i18n, currentLocale } = initI18nContext(Astro, 'features');
 * ---
 * ```
 */
export function initI18nContext(Astro: AstroGlobal, pageKey: string) {
  // Récupérer la fonction de traduction depuis le middleware
  const { t } = Astro.locals;
  
  // Récupérer la langue actuelle depuis l'URL
  const currentLocale = Astro.url.pathname.split('/')[1] === 'en' ? 'en' : 'fr';
  
  // Créer une fonction spécifique pour les traductions de la page
  const i18n = (key: string, params?: Record<string, any>): string => {
    const fullKey = `${pageKey}.${key}`;
    const translation = t(fullKey);
    
    // Si des paramètres sont fournis, les remplacer dans la traduction
    if (params) {
      return Object.entries(params).reduce((str, [param, value]) => {
        return str.replace(new RegExp(`{${param}}`, 'g'), String(value));
      }, translation);
    }
    
    return translation;
  };
  
  return {
    t,
    i18n,
    currentLocale: currentLocale as Lang,
    
    // Générer un URL pour une page avec la langue courante
    getLocalizedUrl: (path: string): string => {
      if (currentLocale === 'fr') {
        // Pour le français (langue par défaut), pas de préfixe de langue
        return `/${path}`.replace(/\/+/g, '/');
      } else {
        // Pour les autres langues, ajouter le préfixe
        return `/${currentLocale}/${path}`.replace(/\/+/g, '/');
      }
    }
  };
} 