<script lang="ts">
import { onMount } from 'svelte';
let isDark = false;

onMount(() => {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark') {
    isDark = true;
    document.documentElement.classList.add('dark');
  } else if (savedTheme === 'light') {
    isDark = false;
    document.documentElement.classList.remove('dark');
  } else {
    // Si pas de thème sauvegardé, on utilise la préférence système
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    isDark = prefersDark;
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }
});

function toggleDark() {
  isDark = !isDark;
  if (isDark) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}
</script>

<button
  class="px-3 py-2 rounded-md bg-light dark:bg-background border border-gray-300 dark:border-gray-700 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
  aria-label="Activer/désactiver le mode sombre"
  on:click={toggleDark}
  title={isDark ? 'Désactiver le mode sombre' : 'Activer le mode sombre'}
>
  {#if isDark}
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
    <span class="text-text dark:text-light text-sm">Clair</span>
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
    <span class="text-text text-sm">Sombre</span>
  {/if}
</button> 