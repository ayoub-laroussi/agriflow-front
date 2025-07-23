<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Modal from './Modal.svelte';
  import Button from './Button.svelte';
  import Input from './Input.svelte';
  import { spaceStore } from '../../lib/stores/spaceStore';
  import { landStore } from '../../lib/stores/landStore';
  
  // Props
  export let isOpen: boolean = false;
  export let landId: string = '';  // ID du terrain parent, optionnel
  
  // Etat local
  let name: string = '';
  let type: string = 'garden';
  let areaValue: string = '';
  let description: string = '';
  let selectedLandId: string = landId;
  let errors: Record<string, string> = {};
  
  // Options de formulaire
  const spaceTypes = [
    { value: 'field', label: 'Champ' },
    { value: 'garden', label: 'Potager' },
    { value: 'orchard', label: 'Verger' },
    { value: 'rice_field', label: 'Rizière' }
  ];
  
  // Récupère les terrains
  $: lands = $landStore;
  
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
    type = 'garden';
    areaValue = '';
    description = '';
    selectedLandId = landId;
    errors = {};
  }
  
  // Valide le formulaire
  function validateForm(): boolean {
    errors = {};
    
    if (!name.trim()) {
      errors.name = 'Le nom est requis';
    }
    
    if (!type) {
      errors.type = 'Le type d\'espace est requis';
    }
    
    const area = parseFloat(areaValue);
    if (isNaN(area) || area <= 0) {
      errors.area = 'La surface doit être supérieure à 0';
    }
    
    if (!selectedLandId) {
      errors.landId = 'Le terrain parent est requis';
    }
    
    return Object.keys(errors).length === 0;
  }
  
  // Gère la soumission du formulaire
  function handleSubmit() {
    if (validateForm()) {
      const area = parseFloat(areaValue);
      const spaceData = {
        name,
        type: type as any,
        area,
        description: description || undefined,
        landId: selectedLandId
      };
      
      // Ajoute l'espace au store
      spaceStore.addSpace(spaceData);
      
      // Ferme le modal et réinitialise le formulaire
      close();
      dispatch('added', { id: Date.now().toString() });
    }
  }
</script>

<Modal 
  {isOpen} 
  title="Ajouter un espace de culture"
  on:close={close}
>
  <form on:submit|preventDefault={handleSubmit}>
    <div class="space-y-4">
      <Input
        id="space-name"
        label="Nom de l'espace"
        type="text"
        required
        bind:value={name}
        error={errors.name}
      />
      
      <div class="mb-4">
        <label for="space-type" class="block text-sm font-medium mb-1">
          Type d'espace
        </label>
        <select
          id="space-type"
          bind:value={type}
          class="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
        >
          {#each spaceTypes as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
        {#if errors.type}
          <p class="mt-1 text-sm text-red-500">{errors.type}</p>
        {/if}
      </div>
      
      <Input
        id="space-area"
        label="Surface (m²)"
        type="number"
        min="0"
        required
        bind:value={areaValue}
        error={errors.area}
      />
      
      <div class="mb-4">
        <label for="space-land" class="block text-sm font-medium mb-1">
          Terrain parent
        </label>
        <select
          id="space-land"
          bind:value={selectedLandId}
          class="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          disabled={!!landId}
        >
          <option value="">Sélectionnez un terrain</option>
          {#each lands as land}
            <option value={land.id}>{land.name}</option>
          {/each}
        </select>
        {#if errors.landId}
          <p class="mt-1 text-sm text-red-500">{errors.landId}</p>
        {/if}
      </div>
      
      <div class="mb-4">
        <label for="space-description" class="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          id="space-description"
          bind:value={description}
          rows="3"
          class="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
        ></textarea>
      </div>
    </div>
  </form>
  
  <div slot="footer" class="flex justify-end space-x-2">
    <Button variant="outline" on:click={close}>
      Annuler
    </Button>
    <Button on:click={handleSubmit}>
      Ajouter
    </Button>
  </div>
</Modal> 