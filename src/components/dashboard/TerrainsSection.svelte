<script lang="ts">
  // Propriétés du composant
  export let isActive: boolean = false;
</script>

<div class="container mx-auto" class:hidden={!isActive}>
  <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
    <div>
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
        Terrains et Parcelles
      </h1>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Gérez vos différents terrains et parcelles agricoles
      </p>
    </div>
    <div class="mt-4 md:mt-0">
      <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
        <span class="material-symbols-outlined mr-2">add</span>
        Nouveau terrain
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
            placeholder="Rechercher un terrain..."
            type="search"
          >
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <select
          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option>Tous les types</option>
          <option>Terre agricole</option>
          <option>Prairie</option>
          <option>Verger</option>
          <option>Vigne</option>
          <option>Forêt</option>
        </select>
        <select
          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option>Tous les statuts</option>
          <option>En exploitation</option>
          <option>En jachère</option>
          <option>En repos</option>
          <option>En conversion</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Liste des terrains (vue carte) -->
  <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-6">
    <div class="p-4">
      <div class="h-96 w-full bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <div class="text-center">
          <span class="material-symbols-outlined text-4xl text-gray-400 dark:text-gray-500 mb-2">map</span>
          <p class="text-gray-500 dark:text-gray-400">Carte des terrains</p>
          <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">Utilisez les contrôles ci-dessous pour naviguer</p>
        </div>
      </div>
      <div class="flex justify-between mt-4">
        <div>
          <button class="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
            <span class="material-symbols-outlined">zoom_in</span>
          </button>
          <button class="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
            <span class="material-symbols-outlined">zoom_out</span>
          </button>
          <button class="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
            <span class="material-symbols-outlined">my_location</span>
          </button>
        </div>
        <div>
          <select
            class="pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option>Vue Satellite</option>
            <option>Vue Plan</option>
            <option>Vue Topographique</option>
            <option>Vue Hybride</option>
          </select>
        </div>
      </div>
    </div>
  </div>

  <!-- Tableau des terrains -->
  <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Nom
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Type
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Superficie
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Statut
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Cultures
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Date d'acquisition
            </th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <span class="material-symbols-outlined text-green-600 dark:text-green-400">agriculture</span>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900 dark:text-white">Grande Plaine</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">Secteur Nord</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900 dark:text-white">Terre agricole</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900 dark:text-white">5.2 hectares</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                En exploitation
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              Blé, Maïs
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              15/03/2018
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-2">
                <span class="material-symbols-outlined">visibility</span>
              </button>
              <button class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-2">
                <span class="material-symbols-outlined">edit</span>
              </button>
              <button class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                <span class="material-symbols-outlined">delete</span>
              </button>
            </td>
          </tr>
          
          <tr>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                  <span class="material-symbols-outlined text-amber-600 dark:text-amber-400">forest</span>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900 dark:text-white">Colline du Verger</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">Secteur Est</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900 dark:text-white">Verger</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900 dark:text-white">1.8 hectares</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                En exploitation
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              Pommiers, Poiriers
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              22/09/2019
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-2">
                <span class="material-symbols-outlined">visibility</span>
              </button>
              <button class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-2">
                <span class="material-symbols-outlined">edit</span>
              </button>
              <button class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                <span class="material-symbols-outlined">delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div> 