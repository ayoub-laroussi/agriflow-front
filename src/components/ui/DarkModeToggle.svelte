<script lang="ts">
import { onMount } from 'svelte';

let isDarkMode = false;

function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
    window.localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    window.localStorage.setItem('theme', 'light');
  }
}

onMount(() => {
  // Initialisation du mode en fonction du localStorage ou des préférences du système
  const savedTheme = window.localStorage.getItem('theme');
  
  if (savedTheme === 'dark' || 
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDarkMode = true;
    document.documentElement.classList.add('dark');
  } else {
    isDarkMode = false;
    document.documentElement.classList.remove('dark');
  }
});
</script>

<button
  type="button"
  class="p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
  on:click={toggleDarkMode}
  aria-label={isDarkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
>
  {#if isDarkMode}
    <span class="material-symbols-outlined">light_mode</span>
  {:else}
    <span class="material-symbols-outlined">dark_mode</span>
  {/if}
</button> 