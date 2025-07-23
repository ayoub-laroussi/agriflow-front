<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  
  // Props
  export let isOpen: boolean = false;
  export let title: string = '';
  export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  
  // Event dispatcher
  const dispatch = createEventDispatcher<{
    close: void;
  }>();
  
  // Fermer le modal
  function close() {
    dispatch('close');
  }
  
  // Fermer le modal quand on clique sur l'arrière-plan
  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      close();
    }
  }
  
  // Fermer le modal avec la touche Escape
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isOpen) {
      close();
    }
  }
  
  // Empêcher le scroll du body quand le modal est ouvert
  onMount(() => {
    return () => {
      document.body.style.overflow = '';
    };
  });
  
  // Mettre à jour le style du body quand le modal change d'état
  $: if (typeof document !== 'undefined') {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
  
  // Déterminer la classe de taille
  $: sizeClass = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  }[size];
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
  <div 
    class="fixed inset-0 z-50 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <!-- Arrière-plan -->
    <div 
      class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
      transition:fade={{ duration: 200 }}
      on:click={handleBackdropClick}
    ></div>
    
    <!-- Contenu du modal -->
    <div class="flex items-center justify-center min-h-screen p-4">
      <div 
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden w-full {sizeClass} transform transition-all"
        transition:fade={{ duration: 150 }}
      >
        <!-- En-tête -->
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white" id="modal-title">
            {title}
          </h3>
          <button 
            type="button" 
            class="text-gray-400 hover:text-gray-500 focus:outline-none"
            on:click={close}
            aria-label="Fermer"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <!-- Corps -->
        <div class="px-6 py-4">
          <slot></slot>
        </div>
        
        <!-- Pied -->
        {#if $$slots.footer}
          <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <slot name="footer"></slot>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if} 