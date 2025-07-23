<script lang="ts">
  import { onMount } from 'svelte';
  import { landStore } from '../../lib/stores/landStore';
  import Button from './Button.svelte';
  import AddLandModal from './AddLandModal.svelte';
  import AddSpaceModal from './AddSpaceModal.svelte';
  import type { Land } from '../../types/Land';
  
  // État local
  let showAddLandModal = false;
  let showAddSpaceModal = false;
  let selectedLandId = '';
  let isLoading = true;
  let error: string | null = null;
  
  // Fonction pour formater la date
  function formatDate(date: Date): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  }
  
  // Fonction pour formater la surface
  function formatArea(area: number): string {
    if (area >= 10000) {
      return `${(area / 10000).toFixed(2)} ha`;
    } else {
      return `${area} m²`;
    }
  }
  
  // Ouvrir le modal d'ajout de terrain
  function openAddLandModal() {
    showAddLandModal = true;
  }
  
  // Ouvrir le modal d'ajout d'espace
  function openAddSpaceModal(landId: string) {
    selectedLandId = landId;
    showAddSpaceModal = true;
  }
  
  // Gestionnaire pour le bouton d'ajout de terrain
  function handleLandAdded() {
    // Peut être utilisé pour des actions supplémentaires après l'ajout
    showAddLandModal = false;
  }
  
  // Gestionnaire pour le bouton d'ajout d'espace
  function handleSpaceAdded() {
    // Peut être utilisé pour des actions supplémentaires après l'ajout
    showAddSpaceModal = false;
  }
  
  // Supprimer un terrain
  async function deleteLand(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce terrain ?')) {
      try {
        await landStore.removeLand(id);
      } catch (err) {
        console.error('Erreur lors de la suppression du terrain:', err);
        error = 'Erreur lors de la suppression du terrain';
      }
    }
  }
  
  // Initialiser les données depuis l'API
  async function loadLands() {
    isLoading = true;
    error = null;
    
    try {
      // Utiliser un ID utilisateur temporaire pour le développement
      // Dans une application réelle, cet ID viendrait du contexte d'authentification
      const userId = '1'; 
      await landStore.init(userId);
    } catch (err) {
      console.error('Erreur lors du chargement des terrains:', err);
      error = 'Impossible de charger les terrains depuis le serveur';
    } finally {
      isLoading = false;
    }
  }
  
  // Charger les données au montage du composant
  onMount(() => {
    loadLands();
  });
</script>

<div>
  {#if isLoading}
    <div class="text-center py-8">
      <div class="inline-block animate-spin text-4xl mb-4">⟳</div>
      <p class="text-gray-500 dark:text-gray-400">
        Chargement des terrains...
      </p>
    </div>
  {:else if error}
    <div class="text-center py-8">
      <div class="text-red-500 mb-4">
        <span class="material-symbols-outlined text-4xl">error</span>
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Erreur</h3>
      <p class="text-gray-500 dark:text-gray-400 mb-4">
        {error}
      </p>
      <Button on:click={loadLands}>
        Réessayer
      </Button>
    </div>
  {:else if $landStore.length === 0}
    <div class="text-center py-8">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucun terrain</h3>
      <p class="text-gray-500 dark:text-gray-400 mb-4">
        Vous n'avez pas encore ajouté de terrain. Commencez par en ajouter un.
      </p>
      <Button on:click={openAddLandModal}>
        Ajouter un terrain
      </Button>
    </div>
  {:else}
    <div class="mb-4 flex justify-between items-center">
      <h2 class="text-xl font-semibold">Vos terrains</h2>
      <Button on:click={openAddLandModal}>
        Ajouter un terrain
      </Button>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each $landStore as land (land.id)}
        <div class="bg-white dark:bg-gray-700 shadow rounded-lg overflow-hidden">
          <div class="p-4">
            <div class="flex justify-between items-start">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">{land.name}</h3>
              <div class="flex space-x-2">
                <button 
                  class="text-gray-400 hover:text-primary dark:text-gray-300 dark:hover:text-primary-dark"
                  on:click={() => openAddSpaceModal(land.id)}
                >
                  <span class="material-symbols-outlined">add_box</span>
                </button>
                <button 
                  class="text-gray-400 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500"
                  on:click={() => deleteLand(land.id)}
                >
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
            
            <div class="mt-2 text-sm text-gray-600 dark:text-gray-300">
              <p><span class="font-medium">Surface:</span> {formatArea(land.area)}</p>
              {#if land.location}
                <p><span class="font-medium">Localisation:</span> {land.location}</p>
              {/if}
              <p><span class="font-medium">Créé le:</span> {formatDate(land.createdAt)}</p>
            </div>
            
            {#if land.description}
              <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">{land.description}</p>
            {/if}
          </div>
          
          <div class="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-600">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500 dark:text-gray-400">
                Espaces: {0}
              </span>
              <Button variant="outline" size="sm">
                Voir les détails
              </Button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
  
  <!-- Modals -->
  <AddLandModal 
    isOpen={showAddLandModal} 
    on:close={() => showAddLandModal = false}
    on:added={handleLandAdded}
  />
  
  <AddSpaceModal 
    isOpen={showAddSpaceModal} 
    landId={selectedLandId}
    on:close={() => showAddSpaceModal = false}
    on:added={handleSpaceAdded}
  />
</div> 