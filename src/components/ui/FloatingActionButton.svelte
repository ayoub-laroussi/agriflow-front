<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  // Props
  export let position: 'bottom-right' | 'bottom-center' | 'bottom-left' = 'bottom-right';
  export let icon: string = 'add';
  export let label: string = 'Ajouter';
  export let color: 'primary' | 'secondary' | 'accent' | 'danger' = 'primary';
  export let showLabel: boolean = false;
  
  // Position class
  $: positionClass = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
    'bottom-left': 'bottom-6 left-6'
  }[position];
  
  // Color class
  $: colorClass = {
    'primary': 'bg-primary hover:bg-primary-dark text-white',
    'secondary': 'bg-secondary hover:bg-secondary text-white',
    'accent': 'bg-accent hover:bg-accent text-white',
    'danger': 'bg-red-500 hover:bg-red-600 text-white'
  }[color];
  
  // Dispatch pour les événements
  const dispatch = createEventDispatcher<{
    click: void;
  }>();
  
  // Gestionnaire de clic
  function handleClick() {
    dispatch('click');
  }
</script>

<button
  type="button"
  aria-label={label}
  class="fixed z-40 {positionClass} {colorClass} flex items-center justify-center shadow-lg rounded-full transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
  on:click={handleClick}
>
  <!-- Si showLabel est true, ajouter un style pill avec le texte -->
  {#if showLabel}
    <div class="flex items-center px-4 py-2">
      <span class="material-symbols-outlined mr-2">{icon}</span>
      <span class="text-sm font-medium">{label}</span>
    </div>
  {:else}
    <div class="p-4">
      <span class="material-symbols-outlined">{icon}</span>
    </div>
  {/if}
</button> 