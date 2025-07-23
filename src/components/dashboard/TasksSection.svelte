<script lang="ts">
  // Propriétés du composant
  export let isActive: boolean = false;
  import AddActionModal from '../ui/AddActionModal.svelte';
  import { actionStore } from '../../lib/stores/actionStore';
  import { landStore } from '../../lib/stores/landStore';
  import { spaceStore } from '../../lib/stores/spaceStore';
  import { onMount } from 'svelte';
  import type { AgriculturalAction } from '../../types/AgriculturalAction';
  
  // État pour gérer l'ouverture de la modale
  let isAddActionModalOpen = false;
  let isDeleteConfirmOpen = false;
  let actionToDelete: AgriculturalAction | null = null;
  let filteredActions: AgriculturalAction[] = [];
  let searchTerm = '';
  let typeFilter = 'all';
  let statusFilter = 'all';
  let dateFilter = 'all';
  
  // Fonction pour ouvrir la modale d'ajout
  function openAddActionModal() {
    isAddActionModalOpen = true;
  }
  
  // Fonction pour fermer la modale d'ajout
  function closeAddActionModal() {
    isAddActionModalOpen = false;
  }
  
  // Fonction pour ouvrir la confirmation de suppression
  function openDeleteConfirm(action: AgriculturalAction) {
    actionToDelete = action;
    isDeleteConfirmOpen = true;
  }
  
  // Fonction pour fermer la confirmation de suppression
  function closeDeleteConfirm() {
    isDeleteConfirmOpen = false;
    actionToDelete = null;
  }
  
  // Fonction pour filtrer les actions
  function filterActions() {
    filteredActions = $actionStore.filter(action => {
      // Filtre par terme de recherche
      const matchesSearch = searchTerm === '' || 
        action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (action.description && action.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Filtre par type
      const matchesType = typeFilter === 'all' || action.type === typeFilter;
      
      // Filtre par statut
      const matchesStatus = statusFilter === 'all' || action.status === statusFilter;
      
      // Filtre par date
      let matchesDate = true;
      if (dateFilter !== 'all' && action.dueDate) {
        const now = new Date();
        const due = new Date(action.dueDate);
        
        switch (dateFilter) {
          case 'today':
            matchesDate = 
              due.getDate() === now.getDate() && 
              due.getMonth() === now.getMonth() && 
              due.getFullYear() === now.getFullYear();
            break;
          case 'tomorrow':
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            matchesDate = 
              due.getDate() === tomorrow.getDate() && 
              due.getMonth() === tomorrow.getMonth() && 
              due.getFullYear() === tomorrow.getFullYear();
            break;
          case 'this_week':
            const endOfWeek = new Date(now);
            endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
            matchesDate = due <= endOfWeek && due >= now;
            break;
          case 'next_7_days':
            const in7Days = new Date(now);
            in7Days.setDate(in7Days.getDate() + 7);
            matchesDate = due <= in7Days && due >= now;
            break;
          case 'next_30_days':
            const in30Days = new Date(now);
            in30Days.setDate(in30Days.getDate() + 30);
            matchesDate = due <= in30Days && due >= now;
            break;
        }
      }
      
      return matchesSearch && matchesType && matchesStatus && matchesDate;
    });
  }
  
  // Fonction pour marquer une action comme terminée
  function completeAction(action: AgriculturalAction) {
    actionStore.setStatus(action.id, 'completed');
    filterActions();
  }
  
  // Fonction pour supprimer une action
  function deleteAction() {
    if (actionToDelete) {
      actionStore.removeAction(actionToDelete.id);
      closeDeleteConfirm();
    }
  }
  
  // Fonction pour obtenir le nom d'un terrain à partir de son ID
  function getLandName(landId: string): string {
    const land = $landStore.find(land => land.id === landId);
    return land ? land.name : '';
  }
  
  // Fonction pour obtenir le nom d'un espace à partir de son ID
  function getSpaceName(spaceId: string): string {
    const space = $spaceStore.find(space => space.id === spaceId);
    return space ? space.name : '';
  }
  
  // Fonction pour gérer l'ajout d'une action
  function handleActionAdded() {
    closeAddActionModal();
    filterActions();
  }
  
  // Fonction pour obtenir le type d'action en français
  function getActionTypeLabel(type: AgriculturalAction['type']): string {
    const types = {
      planting: 'Plantation',
      watering: 'Arrosage',
      fertilizing: 'Fertilisation',
      harvesting: 'Récolte',
      treatment: 'Traitement',
      pruning: 'Taille',
      other: 'Autre'
    };
    return types[type] || 'Action';
  }
  
  // Fonction pour obtenir la classe de couleur selon le type d'action
  function getActionTypeColor(type: AgriculturalAction['type']): string {
    const colors = {
      planting: 'text-green-500',
      watering: 'text-blue-500',
      fertilizing: 'text-yellow-500',
      harvesting: 'text-amber-500',
      treatment: 'text-purple-500',
      pruning: 'text-orange-500',
      other: 'text-gray-500'
    };
    return colors[type] || 'text-gray-500';
  }
  
  // Fonction pour obtenir la classe de couleur selon le statut de l'action
  function getActionStatusColor(status: AgriculturalAction['status']): string {
    const colors = {
      todo: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      in_progress: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      canceled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
  
  // Fonction pour obtenir le libellé du statut de l'action
  function getActionStatusLabel(status: AgriculturalAction['status']): string {
    const statuses = {
      todo: 'À faire',
      in_progress: 'En cours',
      completed: 'Terminé',
      canceled: 'Annulé'
    };
    return statuses[status] || 'Inconnu';
  }
  
  // Fonction pour formater une date
  function formatDate(date: Date | undefined): string {
    if (!date) return 'Non définie';
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dateObj = new Date(date);
    
    // Si c'est aujourd'hui
    if (dateObj.getDate() === today.getDate() &&
        dateObj.getMonth() === today.getMonth() &&
        dateObj.getFullYear() === today.getFullYear()) {
      return `Aujourd'hui à ${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`;
    }
    
    // Si c'est demain
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (dateObj.getDate() === tomorrow.getDate() &&
        dateObj.getMonth() === tomorrow.getMonth() &&
        dateObj.getFullYear() === tomorrow.getFullYear()) {
      return `Demain à ${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`;
    }
    
    // Sinon format complet
    return dateObj.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  // Mettre à jour la liste filtrée lorsque les données du store changent
  $: {
    filterActions();
  }
  
  // Mettre à jour la liste filtrée lorsque les filtres changent
  $: {
    if (searchTerm !== undefined || typeFilter !== undefined || statusFilter !== undefined || dateFilter !== undefined) {
      filterActions();
    }
  }
  
  // Ajouter des exemples d'actions au montage du composant si vide
  onMount(() => {
    // S'assurer qu'il y a des terrains et des espaces
    if ($landStore.length === 0) {
      // Ajouter un terrain par défaut si aucun n'existe
      const landId = landStore.addLand({
        name: "Grande Plaine",
        area: 52000, // 5.2 hectares
        location: "Secteur Nord",
        description: "Terrain plat adapté aux grandes cultures céréalières"
      });
    }
    
    if ($spaceStore.length === 0 && $landStore.length > 0) {
      // Ajouter un espace par défaut si aucun n'existe
      spaceStore.addSpace({
        landId: $landStore[0].id,
        name: "Serre principale",
        type: "garden",
        area: 1200,
        description: "Serre fermée pour cultures sensibles"
      });
    }
    
    if ($actionStore.length === 0) {
      // Ajouter des exemples d'actions
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(18, 0, 0, 0);
      
      // Ajouter une action d'arrosage
      actionStore.addAction({
        title: "Arroser les tomates",
        description: "Arroser les plants de tomates dans la serre. Utiliser de l'eau à température ambiante, environ 5L par rangée.",
        type: "watering",
        priority: "medium",
        dueDate: tomorrow,
        spaceId: $spaceStore.length > 0 ? $spaceStore[0].id : undefined,
        landId: $landStore.length > 0 ? $landStore[0].id : undefined
      });
      
      // Ajouter une action de fertilisation
      const nextWeek = new Date(now);
      nextWeek.setDate(nextWeek.getDate() + 7);
      nextWeek.setHours(10, 0, 0, 0);
      
      actionStore.addAction({
        title: "Fertiliser les champs de blé",
        description: "Appliquer de l'engrais organique sur les champs de blé. Utiliser 200kg/hectare.",
        type: "fertilizing",
        priority: "high",
        dueDate: nextWeek,
        landId: $landStore.length > 0 ? $landStore[0].id : undefined
      });
    }
    
    filterActions();
  });
</script>

<div class="container mx-auto" class:hidden={!isActive}>
  <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
    <div>
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
        Tâches et Actions
      </h1>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Gérez vos tâches agricoles et suivez leur progression
      </p>
    </div>
    <div class="mt-4 md:mt-0">
      <button 
        type="button" 
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        on:click={openAddActionModal}
      >
        <span class="material-symbols-outlined mr-2">add</span>
        Nouvelle tâche
      </button>
    </div>
  </div>

  <!-- Filtres et recherche -->
  <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-6">
    <div class="px-4 py-5 sm:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div class="w-full md:w-64">
        <label for="search" class="sr-only">
          Rechercher
        </label>
        <div class="relative text-gray-400 focus-within:text-gray-600 dark:focus-within:text-gray-300">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="material-symbols-outlined">search</span>
          </div>
          <input
            id="search"
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Rechercher une tâche..."
            type="search"
            bind:value={searchTerm}
          >
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <select
          bind:value={typeFilter}
          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="all">Tous les types</option>
          <option value="planting">Plantation</option>
          <option value="watering">Arrosage</option>
          <option value="fertilizing">Fertilisation</option>
          <option value="harvesting">Récolte</option>
          <option value="treatment">Traitement</option>
          <option value="pruning">Taille</option>
          <option value="other">Autre</option>
        </select>
        <select
          bind:value={statusFilter}
          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="all">Tous les statuts</option>
          <option value="todo">À faire</option>
          <option value="in_progress">En cours</option>
          <option value="completed">Terminé</option>
          <option value="canceled">Annulé</option>
        </select>
        <select
          bind:value={dateFilter}
          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="all">Toutes les dates</option>
          <option value="today">Aujourd'hui</option>
          <option value="tomorrow">Demain</option>
          <option value="this_week">Cette semaine</option>
          <option value="next_7_days">7 prochains jours</option>
          <option value="next_30_days">30 prochains jours</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Vue des tâches -->
  <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-6">
    <div class="divide-y divide-gray-200 dark:divide-gray-700">
      {#if filteredActions.length === 0}
        <div class="p-8 text-center">
          <span class="material-symbols-outlined text-4xl text-gray-400 dark:text-gray-500 mb-2">task</span>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucune tâche trouvée</h3>
          <p class="text-gray-500 dark:text-gray-400 mb-4">Commencez par ajouter une tâche agricole</p>
          <button 
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            on:click={openAddActionModal}
          >
            <span class="material-symbols-outlined mr-2">add</span>
            Nouvelle tâche
          </button>
        </div>
      {:else}
        {#each filteredActions as action (action.id)}
          <div class="p-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <span class="material-symbols-outlined {getActionTypeColor(action.type)}">{
                    action.type === 'watering' ? 'water_drop' :
                    action.type === 'planting' ? 'grass' :
                    action.type === 'fertilizing' ? 'compost' :
                    action.type === 'harvesting' ? 'agriculture' :
                    action.type === 'treatment' ? 'healing' :
                    action.type === 'pruning' ? 'cut' :
                    'event_note'
                  }</span>
                </div>
                <div class="ml-4">
                  <h4 class="text-lg font-medium text-gray-900 dark:text-white">
                    {action.title}
                  </h4>
                  <div class="mt-1 flex items-center flex-wrap">
                    {#if action.spaceId}
                      <span class="text-sm text-gray-500 dark:text-gray-400">
                        {getSpaceName(action.spaceId)}
                      </span>
                      <span class="mx-2 text-gray-500">•</span>
                    {/if}
                    {#if action.landId}
                      <span class="text-sm text-gray-500 dark:text-gray-400">
                        {getLandName(action.landId)}
                      </span>
                      <span class="mx-2 text-gray-500">•</span>
                    {/if}
                    <span class="text-sm text-gray-500 dark:text-gray-400">
                      {action.dueDate ? formatDate(action.dueDate) : 'Sans date'}
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex items-center">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getActionStatusColor(action.status)}">
                  {getActionStatusLabel(action.status)}
                </span>
                <div class="ml-4 flex items-center space-x-2">
                  {#if action.status !== 'completed' && action.status !== 'canceled'}
                    <button 
                      class="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-200"
                      on:click={() => completeAction(action)}
                      title="Marquer comme terminé"
                    >
                      <span class="material-symbols-outlined">check_circle</span>
                    </button>
                  {/if}
                  <button class="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200" title="Modifier">
                    <span class="material-symbols-outlined">edit</span>
                  </button>
                  <button 
                    class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
                    on:click={() => openDeleteConfirm(action)}
                    title="Supprimer"
                  >
                    <span class="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            </div>
            {#if action.description}
              <div class="mt-2">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {action.description}
                </p>
              </div>
            {/if}
          </div>
        {/each}
      {/if}
    </div>
  </div>

  <!-- Remplacer les modales par des divs conditionnels -->
  {#if isAddActionModalOpen}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Ajouter une nouvelle tâche</h3>
          <button on:click={closeAddActionModal} class="text-gray-400 hover:text-gray-500">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="p-4">
          <AddActionModal on:close={closeAddActionModal} on:added={handleActionAdded} />
        </div>
      </div>
    </div>
  {/if}
  
  {#if isDeleteConfirmOpen}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-sm w-full">
        <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Confirmer la suppression</h3>
          <button on:click={closeDeleteConfirm} class="text-gray-400 hover:text-gray-500">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="p-4">
          <div class="text-gray-700 dark:text-gray-300">
            <p>Êtes-vous sûr de vouloir supprimer <strong>{actionToDelete?.title}</strong> ?</p>
            <p class="text-sm text-red-500 mt-2">
              <span class="material-symbols-outlined text-sm align-middle mr-1">warning</span>
              Cette action ne peut pas être annulée.
            </p>
          </div>
          
          <div class="mt-6 flex justify-end space-x-3">
            <button 
              type="button" 
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              on:click={closeDeleteConfirm}
            >
              Annuler
            </button>
            <button 
              type="button" 
              class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              on:click={deleteAction}
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div> 