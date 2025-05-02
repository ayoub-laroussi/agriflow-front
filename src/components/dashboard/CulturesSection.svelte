<script lang="ts">
  // Propriétés du composant
  export let isActive: boolean = false;
</script>

<div class="container mx-auto" class:hidden={!isActive}>
  <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
    <div>
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
        Cultures et Plantations
      </h1>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Gérez les cultures et suivez leur développement
      </p>
    </div>
    <div class="mt-4 md:mt-0">
      <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
        <span class="material-symbols-outlined mr-2">add</span>
        Nouvelle culture
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
            placeholder="Rechercher une culture..."
            type="search"
          >
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <select
          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option>Tous les types</option>
          <option>Légumes</option>
          <option>Fruits</option>
          <option>Herbes</option>
          <option>Céréales</option>
          <option>Fleurs</option>
        </select>
        <select
          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option>Tous les statuts</option>
          <option>En croissance</option>
          <option>Prêt à récolter</option>
          <option>Problème</option>
          <option>En dormance</option>
        </select>
        <select
          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option>Tous les espaces</option>
          <option>Serre principale</option>
          <option>Potager Est</option>
          <option>Plein champ Nord</option>
          <option>Verger</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Liste des cultures -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Culture 1 -->
    <div class="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
      <div class="relative">
        <img src="https://images.unsplash.com/photo-1528796940776-4726561eec3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Tomates" class="w-full h-48 object-cover">
        <div class="absolute top-0 right-0 mt-4 mr-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            En croissance
          </span>
        </div>
      </div>
      <div class="p-4">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Tomates Roma</h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Serre principale - Rangée 1</p>
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
        <div class="mt-4">
          <div class="flex justify-between items-center mb-1">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Progression</span>
            <span class="text-sm text-gray-500 dark:text-gray-400">65%</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div class="bg-green-500 h-2 rounded-full" style="width: 65%"></div>
          </div>
          <div class="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Planté: 12/06/2023</span>
            <span>Récolte prévue: 25/10/2023</span>
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

    <!-- Culture 2 -->
    <div class="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
      <div class="relative">
        <img src="https://images.unsplash.com/photo-1595855759920-3d8090396102?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Carottes" class="w-full h-48 object-cover">
        <div class="absolute top-0 right-0 mt-4 mr-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
            Prêt à récolter
          </span>
        </div>
      </div>
      <div class="p-4">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Carottes Nantaises</h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Potager Sud - Planche 1</p>
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
        <div class="mt-4">
          <div class="flex justify-between items-center mb-1">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Progression</span>
            <span class="text-sm text-gray-500 dark:text-gray-400">95%</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div class="bg-amber-500 h-2 rounded-full" style="width: 95%"></div>
          </div>
          <div class="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Planté: 28/05/2023</span>
            <span>Récolte prévue: 06/10/2023</span>
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

    <!-- Autres cultures seraient ajoutées ici -->
  </div>
</div> 