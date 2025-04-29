<script lang="ts">
import { onMount } from 'svelte';
import { t } from '../../lib/utils/i18n';

export let currentLanguage: string;
export let availableLanguages = ['fr', 'en'];

let isOpen = false;

const toggleDropdown = () => {
  isOpen = !isOpen;
};

const handleLanguageChange = (language: string) => {
  if (language !== currentLanguage) {
    const pathSegments = window.location.pathname.split('/');
    // Si première partie du path est une langue, la remplacer ou l'ajouter
    if (availableLanguages.includes(pathSegments[1])) {
      pathSegments[1] = language;
    } else {
      // Ajouter la langue
      pathSegments.splice(1, 0, language);
    }
    
    // Rediriger vers la nouvelle URL avec la langue choisie
    if (language === 'fr') {
      // Pour le français (langue par défaut), on retire le segment de langue
      pathSegments.splice(1, 1);
    }
    
    const newPath = pathSegments.join('/');
    window.location.href = newPath || '/';
  }
  isOpen = false;
};

// Fermer le menu au clic en dehors
onMount(() => {
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
    aria-label={t("global.language.switch")}
  >
    <span class="hidden sm:inline">{availableLanguages.includes(currentLanguage) ? new Intl.DisplayNames([currentLanguage], { type: 'language' }).of(currentLanguage) : 'Français'}</span>
    <span class="sm:hidden">{currentLanguage.toUpperCase()}</span>
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
              class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors {language === currentLanguage ? 'text-primary dark:text-secondary font-medium' : 'text-text dark:text-light'}"
              on:click={() => handleLanguageChange(language)}
            >
              {t(`global.language.${language}`)}
            </button>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div> 