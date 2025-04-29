<script lang="ts">
import { onMount } from 'svelte';
import { currentLang, setLang, translation } from '../../lib/stores/i18nStore';
import Translate from './Translate.svelte';

// État local pour stocker l'année en cours pour le copyright
let currentYear = new Date().getFullYear();

// Fonction pour changer la langue
function changeLang(lang: 'fr' | 'en'): void {
  setLang(lang);
}
</script>

<div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
  <h2 class="text-xl font-bold mb-4 text-primary dark:text-secondary">
    <Translate key="global.site_name" />
  </h2>
  
  <div class="mb-6">
    <h3 class="text-lg font-semibold mb-2">Sélection de langue</h3>
    <div class="flex gap-2">
      <button
        class="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 {$currentLang === 'fr' ? 'bg-primary text-white' : ''}"
        on:click={() => changeLang('fr')}
      >
        Français
      </button>
      <button
        class="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 {$currentLang === 'en' ? 'bg-primary text-white' : ''}"
        on:click={() => changeLang('en')}
      >
        English
      </button>
    </div>
  </div>
  
  <div class="mb-6">
    <h3 class="text-lg font-semibold mb-2">Exemples de traduction</h3>
    <ul class="space-y-2">
      <li>
        <span class="font-medium">Avec le composant Translate:</span>
        <div class="ml-4 text-gray-700 dark:text-gray-300">
          <div>
            <Translate key="navigation.home" />
          </div>
          <div>
            <Translate key="navigation.features" />
          </div>
          <div>
            <Translate key="features.title" />
          </div>
        </div>
      </li>
      <li>
        <span class="font-medium">Avec le store translation:</span>
        <div class="ml-4 text-gray-700 dark:text-gray-300">
          <div>{$translation('navigation.contact')}</div>
          <div>{$translation('navigation.login')}</div>
          <div>{$translation('hero.cta')}</div>
        </div>
      </li>
      <li>
        <span class="font-medium">Avec interpolation:</span>
        <div class="ml-4 text-gray-700 dark:text-gray-300">
          <div>{$translation('footer.copyright', { year: currentYear })}</div>
        </div>
      </li>
    </ul>
  </div>
  
  <div>
    <h3 class="text-lg font-semibold mb-2">Langue actuelle</h3>
    <div class="px-3 py-2 bg-gray-100 dark:bg-gray-900 rounded">
      <code>{$currentLang}</code>
    </div>
  </div>
</div> 