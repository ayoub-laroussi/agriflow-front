<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Modal from './Modal.svelte';
  import Button from './Button.svelte';
  import Input from './Input.svelte';
  import { actionStore } from '../../lib/stores/actionStore';
  import { landStore } from '../../lib/stores/landStore';
  import { spaceStore } from '../../lib/stores/spaceStore';
  import type { Land } from '../../types/Land';
  import type { CultivationSpace } from '../../types/CultivationSpace';
  
  // Props
  export let isOpen: boolean = false;
  
  // Etat local
  let title: string = '';
  let description: string = '';
  let type: string = 'planting';
  let priority: string = 'medium';
  let selectedLandId: string = '';
  let selectedSpaceId: string = '';
  let dueDateString: string = '';
  let errors: Record<string, string> = {};
  
  // Options de formulaire
  const actionTypes = [
    { value: 'planting', label: 'Plantation' },
    { value: 'watering', label: 'Arrosage' },
    { value: 'fertilizing', label: 'Fertilisation' },
    { value: 'harvesting', label: 'Récolte' },
    { value: 'treatment', label: 'Traitement' },
    { value: 'pruning', label: 'Taille' },
    { value: 'other', label: 'Autre' },
  ];
  
  const priorityLevels = [
    { value: 'low', label: 'Basse' },
    { value: 'medium', label: 'Moyenne' },
    { value: 'high', label: 'Haute' },
  ];
  
  // Récupère les données des terrains et espaces
  $: lands = $landStore;
  $: spaces = selectedLandId 
    ? $spaceStore.filter(space => space.landId === selectedLandId) 
    : [];
  
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
    title = '';
    description = '';
    type = 'planting';
    priority = 'medium';
    selectedLandId = '';
    selectedSpaceId = '';
    dueDateString = '';
    errors = {};
  }
  
  // Met à jour les espaces lorsque le terrain change
  function handleLandChange() {
    selectedSpaceId = '';
  }
  
  // Valide le formulaire
  function validateForm(): boolean {
    errors = {};
    
    if (!title.trim()) {
      errors.title = 'Le titre est requis';
    }
    
    if (!type) {
      errors.type = 'Le type d\'action est requis';
    }
    
    if (!priority) {
      errors.priority = 'La priorité est requise';
    }
    
    if (dueDateString) {
      const dueDate = new Date(dueDateString);
      if (isNaN(dueDate.getTime())) {
        errors.dueDate = 'La date est invalide';
      }
    }
    
    return Object.keys(errors).length === 0;
  }
  
  // Gère la soumission du formulaire
  function handleSubmit() {
    if (validateForm()) {
      const actionData = {
        title,
        description: description || undefined,
        type: type as any,
        priority: priority as any,
        dueDate: dueDateString ? new Date(dueDateString) : undefined,
        landId: selectedLandId || undefined,
        spaceId: selectedSpaceId || undefined
      };
      
      // Ajoute l'action au store
      actionStore.addAction(actionData);
      
      // Ferme le modal et réinitialise le formulaire
      close();
      dispatch('added', { id: Date.now().toString() });
    }
  }
</script>

<Modal 
  {isOpen} 
  title="Ajouter une action agricole"
  on:close={close}
>
  <form on:submit|preventDefault={handleSubmit}>
    <div class="space-y-4">
      <Input
        id="action-title"
        label="Titre de l'action"
        type="text"
        required
        bind:value={title}
        error={errors.title}
      />
      
      <div class="mb-4">
        <label for="action-type" class="block text-sm font-medium mb-1">
          Type d'action
        </label>
        <select
          id="action-type"
          bind:value={type}
          class="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
        >
          {#each actionTypes as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
        {#if errors.type}
          <p class="mt-1 text-sm text-red-500">{errors.type}</p>
        {/if}
      </div>
      
      <div class="mb-4">
        <label for="action-priority" class="block text-sm font-medium mb-1">
          Priorité
        </label>
        <select
          id="action-priority"
          bind:value={priority}
          class="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
        >
          {#each priorityLevels as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
        {#if errors.priority}
          <p class="mt-1 text-sm text-red-500">{errors.priority}</p>
        {/if}
      </div>
      
      <Input
        id="action-due-date"
        label="Date prévue"
        type="date"
        bind:value={dueDateString}
        error={errors.dueDate}
      />
      
      <div class="mb-4">
        <label for="action-land" class="block text-sm font-medium mb-1">
          Terrain (optionnel)
        </label>
        <select
          id="action-land"
          bind:value={selectedLandId}
          on:change={handleLandChange}
          class="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
        >
          <option value="">Sélectionnez un terrain</option>
          {#each lands as land}
            <option value={land.id}>{land.name}</option>
          {/each}
        </select>
      </div>
      
      {#if selectedLandId && spaces.length > 0}
        <div class="mb-4">
          <label for="action-space" class="block text-sm font-medium mb-1">
            Espace de culture (optionnel)
          </label>
          <select
            id="action-space"
            bind:value={selectedSpaceId}
            class="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          >
            <option value="">Sélectionnez un espace</option>
            {#each spaces as space}
              <option value={space.id}>{space.name}</option>
            {/each}
          </select>
        </div>
      {/if}
      
      <div class="mb-4">
        <label for="action-description" class="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          id="action-description"
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