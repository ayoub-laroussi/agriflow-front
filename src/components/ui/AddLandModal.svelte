<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';
  import Input from './Input.svelte';
  import { landStore } from '../../lib/stores/landStore';
  
  // Etat local
  let name: string = '';
  let areaValue: string = '';  // Changed to string to fix the binding issue
  let location: string = '';
  let description: string = '';
  let errors: Record<string, string> = {};
  let isLoading: boolean = false;
  
  // Dispatch pour les événements
  const dispatch = createEventDispatcher<{
    close: void;
    added: { id: string };
  }>();
  
  // Ferme le modal
  function close() {
    dispatch('close');
    resetForm();
  }
  
  // Réinitialise le formulaire
  function resetForm() {
    name = '';
    areaValue = '';
    location = '';
    description = '';
    errors = {};
    isLoading = false;
  }
  
  // Valide le formulaire
  function validateForm(): boolean {
    errors = {};
    
    if (!name.trim()) {
      errors.name = 'Le nom est requis';
    }
    
    const area = parseFloat(areaValue);
    if (isNaN(area) || area <= 0) {
      errors.area = 'La surface doit être supérieure à 0';
    }
    
    return Object.keys(errors).length === 0;
  }
  
  // Gère la soumission du formulaire
  async function handleSubmit() {
    if (validateForm()) {
      isLoading = true;
      
      try {
        const area = parseFloat(areaValue);
        const landData = {
          name,
          area,
          location: location || undefined,
          description: description || undefined
        };
        
        // Ajoute le terrain au store via l'API
        const newLand = await landStore.addLand(landData);
        
        // Ferme le modal et réinitialise le formulaire
        close();
        dispatch('added', { id: newLand.id });
      } catch (error) {
        console.error('Erreur lors de l\'ajout du terrain:', error);
        errors.submit = 'Erreur lors de l\'ajout du terrain. Veuillez réessayer.';
      } finally {
        isLoading = false;
      }
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="space-y-4">
    <Input
      id="land-name"
      label="Nom du terrain"
      type="text"
      required
      bind:value={name}
      error={errors.name}
    />
    
    <Input
      id="land-area"
      label="Surface (m²)"
      type="number"
      min="0"
      required
      bind:value={areaValue}
      error={errors.area}
    />
    
    <Input
      id="land-location"
      label="Localisation"
      type="text"
      bind:value={location}
    />
    
    <div class="mb-4">
      <label for="land-description" class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
        Description
      </label>
      <textarea
        id="land-description"
        bind:value={description}
        rows="3"
        class="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
      ></textarea>
    </div>
    
    {#if errors.submit}
      <div class="text-red-500 text-sm">{errors.submit}</div>
    {/if}
  </div>

  <div class="flex justify-end space-x-2 mt-6">
    <button 
      type="button" 
      class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      on:click={close}
      disabled={isLoading}
    >
      Annuler
    </button>
    <button 
      type="submit" 
      class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={isLoading}
    >
      {#if isLoading}
        <span class="inline-block animate-spin mr-2">⟳</span>
        Ajout en cours...
      {:else}
        Ajouter
      {/if}
    </button>
  </div>
</form> 