<script lang="ts">
  // Propriétés du composant
  export let isActive: boolean = false;
</script>

<div class="container mx-auto" class:hidden={!isActive}>
  <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
    <div>
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
        Calendrier Agricole
      </h1>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Planification et suivi de vos activités agricoles
      </p>
    </div>
    <div class="mt-4 md:mt-0">
      <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
        <span class="material-symbols-outlined mr-2">add</span>
        Nouvel événement
      </button>
    </div>
  </div>

  <!-- Filtres et navigation du calendrier -->
  <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-6">
    <div class="px-4 py-5 sm:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div class="flex items-center space-x-4">
        <button class="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
          <span class="material-symbols-outlined">chevron_left</span>
        </button>
        <h2 class="text-lg font-medium text-gray-900 dark:text-white">Octobre 2023</h2>
        <button class="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
          <span class="material-symbols-outlined">chevron_right</span>
        </button>
        <button class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Aujourd'hui
        </button>
      </div>
      <div class="flex items-center space-x-2">
        <button class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Mois
        </button>
        <button class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Semaine
        </button>
        <button class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 text-white">
          Jour
        </button>
        <select
          class="block w-full pl-3 pr-10 py-1 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option>Toutes les catégories</option>
          <option>Plantation</option>
          <option>Récolte</option>
          <option>Entretien</option>
          <option>Formation</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Vue du calendrier -->
  <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
    <!-- Jours de la semaine -->
    <div class="grid grid-cols-7 gap-px border-b border-gray-200 dark:border-gray-700">
      <div class="py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">Lun</div>
      <div class="py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">Mar</div>
      <div class="py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">Mer</div>
      <div class="py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">Jeu</div>
      <div class="py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">Ven</div>
      <div class="py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">Sam</div>
      <div class="py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">Dim</div>
    </div>

    <!-- Grille des jours -->
    <div class="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
      <!-- Jours du mois précédent -->
      <div class="bg-gray-100 dark:bg-gray-800 min-h-[120px] py-2 px-3">
        <div class="text-gray-400 dark:text-gray-500 text-sm">30</div>
      </div>
      <div class="bg-gray-100 dark:bg-gray-800 min-h-[120px] py-2 px-3">
        <div class="text-gray-400 dark:text-gray-500 text-sm">31</div>
      </div>

      <!-- Jours du mois actuel -->
      <div class="bg-white dark:bg-gray-800 min-h-[120px] py-2 px-3">
        <div class="text-gray-700 dark:text-gray-300 text-sm">1</div>
        <div class="mt-2">
          <div class="p-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded truncate mb-1">
            Arrosage
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 min-h-[120px] py-2 px-3">
        <div class="text-gray-700 dark:text-gray-300 text-sm">2</div>
      </div>
      <div class="bg-white dark:bg-gray-800 min-h-[120px] py-2 px-3">
        <div class="text-gray-700 dark:text-gray-300 text-sm">3</div>
        <div class="mt-2">
          <div class="p-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded truncate mb-1">
            Plantation
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 min-h-[120px] py-2 px-3">
        <div class="text-gray-700 dark:text-gray-300 text-sm">4</div>
      </div>
      <div class="bg-white dark:bg-gray-800 min-h-[120px] py-2 px-3">
        <div class="text-gray-700 dark:text-gray-300 text-sm">5</div>
      </div>

      <!-- Autres jours ici ... -->
      <!-- Nous représentons seulement une partie du calendrier pour l'exemple -->
      <div class="bg-white dark:bg-gray-800 min-h-[120px] py-2 px-3">
        <div class="text-gray-700 dark:text-gray-300 text-sm">6</div>
      </div>
      <div class="bg-white dark:bg-gray-800 min-h-[120px] py-2 px-3">
        <div class="text-gray-700 dark:text-gray-300 text-sm">7</div>
      </div>
      <div class="bg-white dark:bg-gray-800 min-h-[120px] py-2 px-3">
        <div class="text-gray-700 dark:text-gray-300 text-sm">8</div>
        <div class="mt-2">
          <div class="p-1 text-xs bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded truncate mb-1">
            Récolte
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 min-h-[120px] py-2 px-3">
        <div class="text-gray-700 dark:text-gray-300 text-sm">9</div>
      </div>
      <div class="bg-white dark:bg-gray-800 min-h-[120px] py-2 px-3">
        <div class="text-gray-700 dark:text-gray-300 text-sm">10</div>
      </div>
      <div class="bg-white dark:bg-gray-800 min-h-[120px] py-2 px-3">
        <div class="text-gray-700 dark:text-gray-300 text-sm">11</div>
      </div>
      <div class="bg-white dark:bg-gray-800 min-h-[120px] py-2 px-3">
        <div class="text-gray-700 dark:text-gray-300 text-sm">12</div>
      </div>
    </div>
  </div>
</div> 