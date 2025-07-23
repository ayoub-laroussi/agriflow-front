<script lang="ts">
  // Propriétés du composant
  export let isActive: boolean = false;
  
  import { onMount } from 'svelte';
  
  // Définition du type Culture
  interface Culture {
    id: string;
    name: string;
    variety: string;
    status: 'seeded' | 'growing' | 'ready' | 'harvested';
    startDate: Date;
    expectedHarvestDate: Date;
  }
  
  // État pour gérer les modales
  let isAddCultureModalOpen = false;
  let isDeleteConfirmOpen = false;
  let cultureToDelete: Culture | null = null;
  
  // Fonction pour ouvrir la modale d'ajout
  function openAddCultureModal() {
    isAddCultureModalOpen = true;
  }
  
  // Fonction pour fermer la modale d'ajout
  function closeAddCultureModal() {
    isAddCultureModalOpen = false;
  }
  
  // Fonction pour ouvrir la confirmation de suppression
  function openDeleteConfirm(culture: Culture) {
    cultureToDelete = culture;
    isDeleteConfirmOpen = true;
  }
  
  // Fonction pour fermer la confirmation de suppression
  function closeDeleteConfirm() {
    isDeleteConfirmOpen = false;
    cultureToDelete = null;
  }
  
  // Données temporaires pour l'exemple
  let cultures: Culture[] = [
    {
      id: '1',
      name: 'Tomates',
      variety: 'Roma',
      status: 'growing',
      startDate: new Date('2023-04-15'),
      expectedHarvestDate: new Date('2023-07-15')
    },
    {
      id: '2',
      name: 'Carottes',
      variety: 'Nantaise',
      status: 'seeded',
      startDate: new Date('2023-05-01'),
      expectedHarvestDate: new Date('2023-08-01')
    }
  ];
  
  onMount(() => {
    console.log('CulturesSection mounted, isActive:', isActive);
  });
</script>

<div class="container mx-auto" class:hidden={!isActive}>
  <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
    <div>
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
        Cultures
      </h1>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Gérez vos cultures et suivez leur progression
      </p>
    </div>
    <div class="mt-4 md:mt-0">
      <button 
        type="button" 
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        on:click={openAddCultureModal}
      >
        <span class="material-symbols-outlined mr-2">add</span>
        Nouvelle culture
      </button>
    </div>
  </div>

  <!-- Liste des cultures -->
  <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-6">
    {#if cultures.length === 0}
      <div class="p-8 text-center">
        <span class="material-symbols-outlined text-4xl text-gray-400 dark:text-gray-500 mb-2">spa</span>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucune culture trouvée</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-4">Commencez par ajouter une culture</p>
        <button 
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          on:click={openAddCultureModal}
        >
          <span class="material-symbols-outlined mr-2">add</span>
          Nouvelle culture
        </button>
      </div>
    {:else}
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Culture
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Variété
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Statut
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Date de début
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Récolte estimée
            </th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {#each cultures as culture (culture.id)}
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">{culture.name}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500 dark:text-gray-400">{culture.variety}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {culture.status === 'seeded' ? 'Semé' : 
                    culture.status === 'growing' ? 'En croissance' : 
                    culture.status === 'ready' ? 'Prêt à récolter' : 
                    culture.status === 'harvested' ? 'Récolté' : 'Inconnu'}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {culture.startDate.toLocaleDateString('fr-FR')}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {culture.expectedHarvestDate.toLocaleDateString('fr-FR')}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200 mr-2">
                  <span class="material-symbols-outlined">edit</span>
                </button>
                <button 
                  class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
                  on:click={() => openDeleteConfirm(culture)}
                >
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>

  <!-- Modales avec divs conditionnels -->
  {#if isAddCultureModalOpen}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Ajouter une nouvelle culture</h3>
          <button on:click={closeAddCultureModal} class="text-gray-400 hover:text-gray-500">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="p-4">
          <!-- Formulaire d'ajout de culture -->
          <p class="text-center text-gray-500 dark:text-gray-400">
            Formulaire d'ajout de culture à implémenter
          </p>
        </div>
      </div>
    </div>
  {/if}
  
  {#if isDeleteConfirmOpen && cultureToDelete}
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
            <p>Êtes-vous sûr de vouloir supprimer <strong>{cultureToDelete.name}</strong> ?</p>
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
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div> 