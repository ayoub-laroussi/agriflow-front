<script lang="ts">
  // Propriétés du composant
  export let isActive: boolean = false;
</script>

<div class="container mx-auto" class:hidden={!isActive}>
  <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
    <div>
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
        Tâches et Actions
      </h1>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Planifiez et suivez vos tâches agricoles
      </p>
    </div>
    <div class="mt-4 md:mt-0">
      <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
        <span class="material-symbols-outlined mr-2">add</span>
        Nouvelle tâche
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
            placeholder="Rechercher une tâche..."
            type="search"
          >
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <select
          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option>Tous les types</option>
          <option>Plantation</option>
          <option>Arrosage</option>
          <option>Récolte</option>
          <option>Fertilisation</option>
          <option>Taille</option>
          <option>Traitement</option>
        </select>
        <select
          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option>Tous les statuts</option>
          <option>À faire</option>
          <option>En cours</option>
          <option>Terminée</option>
          <option>En retard</option>
        </select>
        <select
          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option>Cette semaine</option>
          <option>Aujourd'hui</option>
          <option>Demain</option>
          <option>7 prochains jours</option>
          <option>30 prochains jours</option>
          <option>Toutes les dates</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Vue des tâches -->
  <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-6">
    <div class="divide-y divide-gray-200 dark:divide-gray-700">
      <!-- Tâche 1 -->
      <div class="p-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <span class="material-symbols-outlined text-blue-500">water_drop</span>
            </div>
            <div class="ml-4">
              <h4 class="text-lg font-medium text-gray-900 dark:text-white">Arrosage des tomates</h4>
              <div class="mt-1 flex items-center">
                <span class="text-sm text-gray-500 dark:text-gray-400">Serre - Rangée 1</span>
                <span class="mx-2 text-gray-500">•</span>
                <span class="text-sm text-gray-500 dark:text-gray-400">Aujourd'hui, 18:00</span>
              </div>
            </div>
          </div>
          <div class="flex items-center">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              À faire
            </span>
            <div class="ml-4 flex items-center space-x-2">
              <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <span class="material-symbols-outlined">check_circle</span>
              </button>
              <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <span class="material-symbols-outlined">edit</span>
              </button>
              <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <span class="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Arroser les plants de tomates avec 5L d'eau par plant. Ne pas mouiller les feuilles pour éviter les maladies.
          </p>
        </div>
      </div>

      <!-- Autres tâches... -->
      <!-- Ajoutez ici d'autres tâches similaires -->

    </div>
  </div>
</div> 