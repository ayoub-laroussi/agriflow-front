/**
 * Store pour la gestion de l'internationalisation
 */
import { writable, derived } from 'svelte/store';
import type { Lang } from '../../types';
import { t } from '../utils/i18n';

// Détermine la langue initiale
function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'fr';
  
  // Récupérer depuis window.APP_LANGUAGE (défini dans Layout.astro)
  const langFromApp = window.APP_LANGUAGE?.current as Lang;
  if (langFromApp && (langFromApp === 'fr' || langFromApp === 'en')) {
    return langFromApp;
  }
  
  // Fallback sur la langue du navigateur
  const browserLang = navigator.language.split('-')[0];
  return browserLang === 'en' ? 'en' : 'fr';
}

// Store pour la langue active
export const currentLang = writable<Lang>(getInitialLang());

// Fonction pour changer la langue
export function setLang(lang: Lang): void {
  if (lang !== 'fr' && lang !== 'en') return;
  
  currentLang.set(lang);
  
  // Mettre à jour l'URL si besoin
  if (typeof window !== 'undefined') {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const availableLangs = window.APP_LANGUAGE?.available || ['fr', 'en'];
    
    // Si première partie du path est une langue, la remplacer ou l'ajouter
    if (availableLangs.includes(pathSegments[0])) {
      pathSegments[0] = lang;
    } else {
      // Ajouter la langue en premier
      pathSegments.unshift(lang);
    }
    
    // Pour le français (langue par défaut), on retire le segment de langue
    if (lang === 'fr') {
      pathSegments.shift();
    }
    
    const newPath = '/' + pathSegments.join('/');
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }
  }
}

// Store dérivé pour obtenir les traductions facilement
export const translation = derived(
  currentLang,
  ($currentLang) => (key: string, params?: Record<string, string | number>) => {
    let translation = t(key, params, $currentLang);
    
    // Les paramètres sont déjà gérés par la fonction t
    return translation;
  }
); 