<script lang="ts">
import { onMount } from 'svelte';
import { currentLang, setLang } from '../../lib/stores/i18nStore';
import { t } from '../../lib/utils/i18n';
import Translate from './Translate.svelte';
import type { Lang } from '../../types';

export let availableLanguages: Lang[] = ['fr', 'en'];
let isOpen = false;

const toggleDropdown = () => {
  isOpen = !isOpen;
};

const handleLanguageChange = (language: Lang) => {
  console.log(`Changement de langue demandé: ${language}, langue actuelle: ${$currentLang}`);
  
  if (language !== $currentLang) {
    // Mettre à jour le store
    setLang(language);
    console.log(`Langue définie dans le store: ${language}`);
    
    // Mettre à jour APP_LANGUAGE pour la cohérence
    if (typeof window !== 'undefined') {
      // Sauvegarder dans localStorage
      localStorage.setItem('lang', language);
      
      // Mettre à jour la variable globale
      window.APP_LANGUAGE.current = language;
      console.log(`Langue définie dans window.APP_LANGUAGE: ${language}`);
      
      // Déclencher un événement pour notifier du changement de langue
      window.dispatchEvent(new CustomEvent('language-changed', { 
        detail: { language },
        bubbles: true  // S'assurer que l'événement remonte dans le DOM
      }));
      console.log(`Événement language-changed déclenché avec la langue: ${language}`);
      
      // Redirection vers l'URL avec le bon préfixe de langue (utilisez l'API Astro)
      setTimeout(() => {
        // Récupérer l'URL actuelle
        const currentUrl = window.location.pathname;
        const searchParams = window.location.search;
        const hash = window.location.hash;
        
        // Construire la nouvelle URL basée sur la langue
        let newUrl = '';
        
        if (language === 'fr') {
          // Pour le français (langue par défaut), on enlève le préfixe /en si présent
          newUrl = currentUrl.replace(/^\/en(\/|$)/, '/');
        } else if (language === 'en') {
          // Pour l'anglais, on s'assure que l'URL commence par /en
          if (currentUrl.startsWith('/en/') || currentUrl === '/en') {
            newUrl = currentUrl;
          } else {
            newUrl = `/en${currentUrl === '/' ? '' : currentUrl}`;
          }
        }
        
        // Ajouter les paramètres de recherche et le hash s'ils existent
        const fullUrl = `${newUrl}${searchParams}${hash}`;
        
        console.log(`Redirection vers: ${fullUrl}`);
        window.location.href = fullUrl;
      }, 100);
    }
  }
  isOpen = false;
};

// Fermer le menu au clic en dehors
onMount(() => {
  console.log(`LanguageSwitcher monté, langue actuelle: ${$currentLang}`);
  
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-switcher-container')) {
      isOpen = false;
    }
  };
  
  document.addEventListener('click', handleClickOutside);
  
  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
});
</script>

<div class="language-switcher-container relative">
  <button
    class="flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-sm bg-light dark:bg-background border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
    on:click={toggleDropdown}
    aria-label="Changer de langue"
  >
    <span class="hidden sm:inline">
      {availableLanguages.includes($currentLang) 
        ? new Intl.DisplayNames([$currentLang], { type: 'language' }).of($currentLang) 
        : 'Français'}
    </span>
    <span class="sm:hidden">{$currentLang.toUpperCase()}</span>
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  </button>
  
  {#if isOpen}
    <div class="absolute top-full right-0 mt-1 w-36 bg-white dark:bg-background rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
      <ul>
        {#each availableLanguages as language}
          <li>
            <button
              class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors {language === $currentLang ? 'text-primary dark:text-secondary font-medium' : 'text-text dark:text-light'}"
              on:click={() => handleLanguageChange(language)}
            >
              {language === 'fr' ? 'Français' : 'English'}
            </button>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div> 