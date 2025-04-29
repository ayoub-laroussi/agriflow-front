<script lang="ts">
import { onMount } from 'svelte';
import { t } from '../../lib/utils/i18n';

// Langues disponibles
const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' }
];

// Langue actuelle
let currentLanguage = 'fr';

function changeLanguage(code: string) {
  currentLanguage = code;
  // Dans une implémentation réelle, cette fonction changerait la langue
  // de l'application et rechargerait les traductions
}

onMount(() => {
  // Dans une implémentation réelle, nous récupérerions la langue actuelle
  // depuis l'état de l'application ou le localStorage
  currentLanguage = window.APP_LANGUAGE?.current || 'fr';
});
</script>

<div class="relative">
  <button 
    type="button"
    class="flex items-center p-1 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md hover:text-gray-900 dark:hover:text-white"
  >
    {#each languages as lang}
      {#if lang.code === currentLanguage}
        <span class="flex items-center">
          <span class="mr-1">{lang.flag}</span>
          <span class="hidden md:inline">{lang.name}</span>
        </span>
      {/if}
    {/each}
    <span class="material-symbols-outlined text-sm ml-1">expand_more</span>
  </button>
  
  <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden">
    <div class="py-1">
      {#each languages as lang}
        <button
          type="button"
          class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 {currentLanguage === lang.code ? 'bg-gray-100 dark:bg-gray-700' : ''}"
          on:click={() => changeLanguage(lang.code)}
        >
          <span class="flex items-center">
            <span class="mr-2">{lang.flag}</span>
            <span>{lang.name}</span>
          </span>
        </button>
      {/each}
    </div>
  </div>
</div> 