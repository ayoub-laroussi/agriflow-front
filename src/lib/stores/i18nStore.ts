import { writable, derived, readable } from 'svelte/store';
import type { Lang } from '../../types';

// Fonction pour initialiser le store de langue
function createLangStore() {
  // Initialiser avec la langue du navigateur ou la langue par défaut
  let initialLang: Lang = 'fr';
  
  if (typeof window !== 'undefined') {
    // Récupérer depuis window.APP_LANGUAGE (défini dans Layout.astro)
    const langFromApp = window.APP_LANGUAGE.current as Lang;
    if (langFromApp) {
      initialLang = langFromApp;
    }
  }
  
  const { subscribe, set, update } = writable<Lang>(initialLang);
  
  return {
    subscribe,
    setLang: (newLang: Lang) => {
      // Mise à jour du store et persistance dans localStorage
      set(newLang);
      if (typeof window !== 'undefined') {
        localStorage.setItem('lang', newLang);
      }
    },
    // Récupérer la langue à partir des préférences utilisateur ou du localStorage
    init: () => {
      if (typeof window !== 'undefined') {
        const savedLang = localStorage.getItem('lang') as Lang;
        if (savedLang) {
          set(savedLang);
        }
      }
    }
  };
}

// Création du store de langue
export const langStore = createLangStore();

// Pour compatibilité avec code existant
export const currentLang = langStore;
export const setLang = langStore.setLang;

// Récupération des langues disponibles
export const availableLangs: string[] = typeof window !== 'undefined' 
  ? window.APP_LANGUAGE.available 
  : ['fr', 'en'];

// Fonction pour remplacer les placeholders dans une chaîne
function interpolateParams(text: string, params: Record<string, string | number>): string {
  return text.replace(/{([^{}]*)}/g, (match, key) => {
    const value = params[key];
    return value !== undefined ? String(value) : match;
  });
}

// Fonction pour obtenir une traduction
export function getTranslation(key: string, params: Record<string, string | number> = {}, lang: Lang = 'fr'): string {
  try {
    if (typeof window === 'undefined') {
      return key; // Pas de traduction côté serveur
    }
    
    // Récupérer les traductions pour la langue spécifiée
    const translations = window.translations[lang];
    
    if (!translations) {
      console.warn(`No translations found for language: ${lang}`);
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
      return interpolateParams(result, params);
    }
    
    return key;
  } catch (error) {
    console.error('Error getting translation:', error);
    return key;
  }
}

// Fonction pour traduire avec réactivité pour les composants Svelte
export function t(key: string, params: Record<string, string | number> = {}) {
  return derived(langStore, ($lang) => getTranslation(key, params, $lang));
}

// Store pour les traductions avec compatibilité
export const translation = readable((key: string, params: Record<string, string | number> = {}) => {
  let currentLang: Lang = 'fr';
  const unsubscribe = langStore.subscribe(value => {
    currentLang = value;
  });
  
  return getTranslation(key, params, currentLang);
}); 