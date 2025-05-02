<script lang="ts">
  // Propriétés du composant
  export let isActive: boolean = false;
</script>

<div class="container mx-auto" class:hidden={!isActive}>
  <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
    <div>
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
        Espaces de Culture
      </h1>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Gérez vos différents espaces de culture
      </p>
    </div>
    <div class="mt-4 md:mt-0">
      <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
        <span class="material-symbols-outlined mr-2">add</span>
        Nouvel espace
      </button>
    </div>
  </div>

  <!-- Filtres et recherche -->
  <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-6">
    <div class="px-4 py-5 sm:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div class="w-full md:w-64">
        <label for="search" class="sr-only">Rechercher</label>
        <div class="relative text-gray-400 focus-within:text-gray-600 dark:focus-within:text-gray-300">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="material-symbols-outlined">search</span>
          </div>
          <input
            id="search"
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Rechercher un espace..."
            type="search"
          >
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <select
          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option>Tous les types</option>
          <option>Serre</option>
          <option>Plein champ</option>
          <option>Jardin</option>
          <option>Potager</option>
          <option>Verger</option>
        </select>
        <select
          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option>Tous les statuts</option>
          <option>Actif</option>
          <option>En préparation</option>
          <option>En repos</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Grille des espaces -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Espace 1 -->
    <div class="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
      <div class="relative">
        <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Serre principale" class="w-full h-48 object-cover">
        <div class="absolute top-0 right-0 mt-4 mr-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Actif
          </span>
        </div>
      </div>
      <div class="p-4">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Serre principale</h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">100m² - 4 sections</p>
          </div>
          <div class="flex space-x-2">
            <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <span class="material-symbols-outlined">edit</span>
            </button>
            <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <span class="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div>
        <div class="mt-4 flex items-center space-x-4">
          <div class="flex items-center">
            <span class="material-symbols-outlined text-green-500 mr-1">spa</span>
            <span class="text-sm text-gray-500 dark:text-gray-400">12 cultures</span>
          </div>
          <div class="flex items-center">
            <span class="material-symbols-outlined text-blue-500 mr-1">water_drop</span>
            <span class="text-sm text-gray-500 dark:text-gray-400">Irrigation auto</span>
          </div>
        </div>
        <div class="mt-4">
          <button type="button" class="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            <span class="material-symbols-outlined mr-2">visibility</span>
            Voir les détails
          </button>
        </div>
      </div>
    </div>

    <!-- Espace 2 -->
    <div class="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
      <div class="relative">
        <img src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Potager Est" class="w-full h-48 object-cover">
        <div class="absolute top-0 right-0 mt-4 mr-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Actif
          </span>
        </div>
      </div>
      <div class="p-4">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Potager Est</h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">50m² - 3 sections</p>
          </div>
          <div class="flex space-x-2">
            <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <span class="material-symbols-outlined">edit</span>
            </button>
            <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <span class="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div>
        <div class="mt-4 flex items-center space-x-4">
          <div class="flex items-center">
            <span class="material-symbols-outlined text-green-500 mr-1">spa</span>
            <span class="text-sm text-gray-500 dark:text-gray-400">8 cultures</span>
          </div>
          <div class="flex items-center">
            <span class="material-symbols-outlined text-blue-500 mr-1">water_drop</span>
            <span class="text-sm text-gray-500 dark:text-gray-400">Irrigation manuelle</span>
          </div>
        </div>
        <div class="mt-4">
          <button type="button" class="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            <span class="material-symbols-outlined mr-2">visibility</span>
            Voir les détails
          </button>
        </div>
      </div>
    </div>

    <!-- Autres espaces seraient ajoutés ici -->
  </div>
</div> 