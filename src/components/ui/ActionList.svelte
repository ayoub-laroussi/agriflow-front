<script lang="ts">
  import { onMount } from 'svelte';
  import { actionStore } from '../../lib/stores/actionStore';
  import { landStore } from '../../lib/stores/landStore';
  import { spaceStore } from '../../lib/stores/spaceStore';
  import Button from './Button.svelte';
  import AddActionModal from './AddActionModal.svelte';
  import type { AgriculturalAction } from '../../types/AgriculturalAction';
  
  // État local
  let showAddActionModal = false;
  let filterStatus = 'all';
  let filterType = 'all';
  
  // Options de filtres
  const statusOptions = [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'todo', label: 'À faire' },
    { value: 'in_progress', label: 'En cours' },
    { value: 'completed', label: 'Terminé' },
    { value: 'canceled', label: 'Annulé' }
  ];
  
  const typeOptions = [
    { value: 'all', label: 'Tous les types' },
    { value: 'planting', label: 'Plantation' },
    { value: 'watering', label: 'Arrosage' },
    { value: 'fertilizing', label: 'Fertilisation' },
    { value: 'harvesting', label: 'Récolte' },
    { value: 'treatment', label: 'Traitement' },
    { value: 'pruning', label: 'Taille' },
    { value: 'other', label: 'Autre' }
  ];
  
  // Actions filtrées
  $: filteredActions = filterActions($actionStore);
  
  // Fonction de filtrage
  function filterActions(actions: AgriculturalAction[]): AgriculturalAction[] {
    return actions.filter(action => {
      const statusMatch = filterStatus === 'all' || action.status === filterStatus;
      const typeMatch = filterType === 'all' || action.type === filterType;
      return statusMatch && typeMatch;
    });
  }
  
  // Fonction pour formater la date
  function formatDate(date: Date | undefined): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
  }
  
  // Fonction pour obtenir le nom du terrain
  function getLandName(landId: string | undefined): string {
    if (!landId) return '-';
    const land = $landStore.find(land => land.id === landId);
    return land ? land.name : '-';
  }
  
  // Fonction pour obtenir le nom de l'espace
  function getSpaceName(spaceId: string | undefined): string {
    if (!spaceId) return '-';
    const space = $spaceStore.find(space => space.id === spaceId);
    return space ? space.name : '-';
  }
  
  // Fonction pour obtenir la couleur du statut
  function getStatusColor(status: AgriculturalAction['status']): string {
    switch (status) {
      case 'todo': return 'text-blue-500 bg-blue-100 dark:text-blue-300 dark:bg-blue-900';
      case 'in_progress': return 'text-yellow-500 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900';
      case 'completed': return 'text-green-500 bg-green-100 dark:text-green-300 dark:bg-green-900';
      case 'canceled': return 'text-red-500 bg-red-100 dark:text-red-300 dark:bg-red-900';
      default: return 'text-gray-500 bg-gray-100 dark:text-gray-300 dark:bg-gray-900';
    }
  }
  
  // Fonction pour obtenir le texte du statut
  function getStatusText(status: AgriculturalAction['status']): string {
    switch (status) {
      case 'todo': return 'À faire';
      case 'in_progress': return 'En cours';
      case 'completed': return 'Terminé';
      case 'canceled': return 'Annulé';
      default: return 'Inconnu';
    }
  }
  
  // Fonction pour obtenir l'icône du type
  function getTypeIcon(type: AgriculturalAction['type']): string {
    switch (type) {
      case 'planting': return 'grass';
      case 'watering': return 'water_drop';
      case 'fertilizing': return 'compost';
      case 'harvesting': return 'agriculture';
      case 'treatment': return 'healing';
      case 'pruning': return 'cut';
      case 'other': return 'more_horiz';
      default: return 'task';
    }
  }
  
  // Fonction pour obtenir le texte du type
  function getTypeText(type: AgriculturalAction['type']): string {
    switch (type) {
      case 'planting': return 'Plantation';
      case 'watering': return 'Arrosage';
      case 'fertilizing': return 'Fertilisation';
      case 'harvesting': return 'Récolte';
      case 'treatment': return 'Traitement';
      case 'pruning': return 'Taille';
      case 'other': return 'Autre';
      default: return 'Inconnu';
    }
  }
  
  // Ouvrir le modal d'ajout d'action
  function openAddActionModal() {
    showAddActionModal = true;
  }
  
  // Gestionnaire pour le bouton d'ajout d'action
  function handleActionAdded() {
    showAddActionModal = false;
  }
  
  // Supprimer une action
  function deleteAction(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette action ?')) {
      actionStore.removeAction(id);
    }
  }
  
  // Changer le statut d'une action
  function changeStatus(id: string, status: AgriculturalAction['status']) {
    actionStore.setStatus(id, status);
  }
</script>

<div>
  <!-- Filtres -->
  <div class="mb-6 flex flex-col md:flex-row gap-4">
    <div class="md:flex-1">
      <label for="status-filter" class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
        Statut
      </label>
      <select
        id="status-filter"
        bind:value={filterStatus}
        class="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
      >
        {#each statusOptions as option}
          <option value={option.value}>{option.label}</option>
        {/each}
      </select>
    </div>
    
    <div class="md:flex-1">
      <label for="type-filter" class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
        Type d'action
      </label>
      <select
        id="type-filter"
        bind:value={filterType}
        class="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
      >
        {#each typeOptions as option}
          <option value={option.value}>{option.label}</option>
        {/each}
      </select>
    </div>
    
    <div class="md:flex-none flex items-end">
      <Button on:click={openAddActionModal}>
        Ajouter une action
      </Button>
    </div>
  </div>
  
  <!-- Liste des actions -->
  {#if filteredActions.length === 0}
    <div class="text-center py-8">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucune action trouvée</h3>
      <p class="text-gray-500 dark:text-gray-400 mb-4">
        {#if $actionStore.length === 0}
          Vous n'avez pas encore ajouté d'action agricole. Commencez par en ajouter une.
        {:else}
          Aucune action ne correspond aux filtres sélectionnés.
        {/if}
      </p>
      {#if $actionStore.length === 0}
        <Button on:click={openAddActionModal}>
          Ajouter une action
        </Button>
      {/if}
    </div>
  {:else}
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Type
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Titre
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Terrain/Espace
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Date prévue
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Statut
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {#each filteredActions as action (action.id)}
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <span class="material-symbols-outlined text-primary mr-2">
                    {getTypeIcon(action.type)}
                  </span>
                  <span class="text-sm text-gray-900 dark:text-white">
                    {getTypeText(action.type)}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {action.title}
                </div>
                {#if action.description}
                  <div class="text-xs text-gray-500 dark:text-gray-400 max-w-xs truncate">
                    {action.description}
                  </div>
                {/if}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">
                  {getLandName(action.landId)}
                </div>
                {#if action.spaceId}
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    {getSpaceName(action.spaceId)}
                  </div>
                {/if}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {formatDate(action.dueDate)}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full {getStatusColor(action.status)}">
                  {getStatusText(action.status)}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <div class="relative">
                    <button 
                      class="text-gray-400 hover:text-primary dark:text-gray-300 dark:hover:text-primary-dark"
                      aria-label="Modifier le statut"
                    >
                      <span class="material-symbols-outlined">expand_more</span>
                    </button>
                    <!-- Menu déroulant de changement de statut (simplifié sans JS) -->
                    <div class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10 hidden group-hover:block">
                      {#each statusOptions.filter(option => option.value !== 'all' && option.value !== action.status) as option}
                        <button 
                          class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                          on:click={() => changeStatus(action.id, option.value as any)}
                        >
                          {option.label}
                        </button>
                      {/each}
                    </div>
                  </div>
                  <button 
                    class="text-gray-400 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500"
                    on:click={() => deleteAction(action.id)}
                    aria-label="Supprimer"
                  >
                    <span class="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
  
  <!-- Modal -->
  <AddActionModal 
    isOpen={showAddActionModal} 
    on:close={() => showAddActionModal = false}
    on:added={handleActionAdded}
  />
</div> 