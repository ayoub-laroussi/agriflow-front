<script lang="ts">
  // Propriétés du composant
  export let isActive: boolean = false;
</script>

<div class="container mx-auto" class:hidden={!isActive}>
  <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
    <div>
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
        Tableau de bord
      </h1>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Vue d'ensemble de votre exploitation agricole
      </p>
    </div>
    <div class="mt-4 md:mt-0">
      <div class="relative inline-block text-left">
        <select
          class="block pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option>Cette semaine</option>
          <option>Ce mois</option>
          <option>Ce trimestre</option>
          <option>Cette année</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Statistiques rapides -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <!-- Stat 1 - Tâches -->
    <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
      <div class="p-5">
        <div class="flex items-center">
          <div class="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 rounded-md p-3">
            <span class="material-symbols-outlined text-indigo-600 dark:text-indigo-400">assignment</span>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                Tâches en cours
              </dt>
              <dd>
                <div class="text-lg font-medium text-gray-900 dark:text-white">8</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 dark:bg-gray-700 px-5 py-3">
        <div class="text-sm">
          <a href="#" class="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
            Voir toutes les tâches
          </a>
        </div>
      </div>
    </div>

    <!-- Stat 2 - Cultures -->
    <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
      <div class="p-5">
        <div class="flex items-center">
          <div class="flex-shrink-0 bg-green-100 dark:bg-green-900 rounded-md p-3">
            <span class="material-symbols-outlined text-green-600 dark:text-green-400">spa</span>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                Cultures actives
              </dt>
              <dd>
                <div class="text-lg font-medium text-gray-900 dark:text-white">12</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 dark:bg-gray-700 px-5 py-3">
        <div class="text-sm">
          <a href="#" class="font-medium text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300">
            Voir toutes les cultures
          </a>
        </div>
      </div>
    </div>

    <!-- Stat 3 - Espaces -->
    <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
      <div class="p-5">
        <div class="flex items-center">
          <div class="flex-shrink-0 bg-blue-100 dark:bg-blue-900 rounded-md p-3">
            <span class="material-symbols-outlined text-blue-600 dark:text-blue-400">grid_view</span>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                Espaces de culture
              </dt>
              <dd>
                <div class="text-lg font-medium text-gray-900 dark:text-white">5</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 dark:bg-gray-700 px-5 py-3">
        <div class="text-sm">
          <a href="#" class="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
            Voir tous les espaces
          </a>
        </div>
      </div>
    </div>

    <!-- Stat 4 - Récoltes -->
    <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
      <div class="p-5">
        <div class="flex items-center">
          <div class="flex-shrink-0 bg-amber-100 dark:bg-amber-900 rounded-md p-3">
            <span class="material-symbols-outlined text-amber-600 dark:text-amber-400">nutrition</span>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                Prochaines récoltes
              </dt>
              <dd>
                <div class="text-lg font-medium text-gray-900 dark:text-white">3</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 dark:bg-gray-700 px-5 py-3">
        <div class="text-sm">
          <a href="#" class="font-medium text-amber-600 dark:text-amber-400 hover:text-amber-500 dark:hover:text-amber-300">
            Voir le calendrier
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Graphiques et données -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
    <!-- Graphique 1 - Évolution des cultures -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white">Progression des cultures</h2>
        <div class="flex items-center">
          <button class="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <span class="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </div>
      <div class="h-72 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
        <div class="text-center">
          <span class="material-symbols-outlined text-4xl text-gray-400 dark:text-gray-500 mb-2">insert_chart</span>
          <p class="text-gray-500 dark:text-gray-400">Graphique d'évolution des cultures</p>
        </div>
      </div>
    </div>

    <!-- Graphique 2 - Météo et prévisions -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white">Météo et prévisions</h2>
        <div class="flex items-center">
          <button class="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <span class="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </div>
      <div class="h-72 bg-gray-100 dark:bg-gray-700 rounded flex flex-col">
        <div class="flex-1 p-4">
          <div class="flex items-center mb-2">
            <span class="material-symbols-outlined text-yellow-500 text-4xl mr-3">wb_sunny</span>
            <div>
              <div class="text-3xl font-bold text-gray-900 dark:text-white">23°C</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Ensoleillé</div>
            </div>
            <div class="ml-auto text-right">
              <div class="text-sm font-medium text-gray-900 dark:text-white">Aujourd'hui</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">Humidité: 45%</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">Vent: 10 km/h</div>
            </div>
          </div>
          
          <div class="mt-4 grid grid-cols-5 gap-2">
            <div class="text-center">
              <div class="text-xs text-gray-500 dark:text-gray-400">Lun</div>
              <span class="material-symbols-outlined text-yellow-500">wb_sunny</span>
              <div class="text-sm font-medium text-gray-900 dark:text-white">25°C</div>
            </div>
            <div class="text-center">
              <div class="text-xs text-gray-500 dark:text-gray-400">Mar</div>
              <span class="material-symbols-outlined text-yellow-500">wb_sunny</span>
              <div class="text-sm font-medium text-gray-900 dark:text-white">24°C</div>
            </div>
            <div class="text-center">
              <div class="text-xs text-gray-500 dark:text-gray-400">Mer</div>
              <span class="material-symbols-outlined text-gray-400">cloud</span>
              <div class="text-sm font-medium text-gray-900 dark:text-white">22°C</div>
            </div>
            <div class="text-center">
              <div class="text-xs text-gray-500 dark:text-gray-400">Jeu</div>
              <span class="material-symbols-outlined text-blue-500">rainy</span>
              <div class="text-sm font-medium text-gray-900 dark:text-white">19°C</div>
            </div>
            <div class="text-center">
              <div class="text-xs text-gray-500 dark:text-gray-400">Ven</div>
              <span class="material-symbols-outlined text-gray-400">cloud</span>
              <div class="text-sm font-medium text-gray-900 dark:text-white">21°C</div>
            </div>
          </div>
          
          <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded">
            <div class="text-sm font-medium text-blue-800 dark:text-blue-200">Alerte météo</div>
            <div class="text-xs text-blue-700 dark:text-blue-300">Prévision de pluie jeudi: 15mm. Pensez à ajuster vos arrosages.</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Activités récentes et prochaines tâches -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Activités récentes -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white">Activités récentes</h2>
        <button class="text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300">
          Voir tout
        </button>
      </div>
      <div class="space-y-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center h-8 w-8 rounded-full bg-green-100 dark:bg-green-900">
              <span class="material-symbols-outlined text-sm text-green-600 dark:text-green-400">check_circle</span>
            </div>
          </div>
          <div class="ml-4">
            <div class="text-sm font-medium text-gray-900 dark:text-white">
              Arrosage terminé
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              Serre principale - Tomates
            </div>
            <div class="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Il y a 2 heures
            </div>
          </div>
        </div>
        
        <div class="flex">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900">
              <span class="material-symbols-outlined text-sm text-blue-600 dark:text-blue-400">water_drop</span>
            </div>
          </div>
          <div class="ml-4">
            <div class="text-sm font-medium text-gray-900 dark:text-white">
              Irrigation automatique déclenchée
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              Potager Est
            </div>
            <div class="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Il y a 5 heures
            </div>
          </div>
        </div>
        
        <div class="flex">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900">
              <span class="material-symbols-outlined text-sm text-yellow-600 dark:text-yellow-400">warning</span>
            </div>
          </div>
          <div class="ml-4">
            <div class="text-sm font-medium text-gray-900 dark:text-white">
              Alerte niveau d'eau bas
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              Réservoir principal
            </div>
            <div class="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Hier, 17:30
            </div>
          </div>
        </div>
        
        <div class="flex">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900">
              <span class="material-symbols-outlined text-sm text-purple-600 dark:text-purple-400">add_task</span>
            </div>
          </div>
          <div class="ml-4">
            <div class="text-sm font-medium text-gray-900 dark:text-white">
              Nouvelle tâche créée
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              Plantation de carottes
            </div>
            <div class="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Hier, 10:15
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Prochaines tâches -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white">Prochaines tâches</h2>
        <button class="text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300">
          Voir tout
        </button>
      </div>
      <div class="space-y-3">
        <div class="p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <span class="material-symbols-outlined text-blue-500 mr-3">water_drop</span>
              <div>
                <div class="text-sm font-medium text-gray-900 dark:text-white">Arrosage des tomates</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Serre - Rangée 1</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-xs text-gray-500 dark:text-gray-400">Aujourd'hui, 18:00</div>
              <div class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mt-1">
                À faire
              </div>
            </div>
          </div>
        </div>
        
        <div class="p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <span class="material-symbols-outlined text-green-500 mr-3">grass</span>
              <div>
                <div class="text-sm font-medium text-gray-900 dark:text-white">Plantation de laitues</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Potager Est - Planche 2</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-xs text-gray-500 dark:text-gray-400">Demain, 10:00</div>
              <div class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 mt-1">
                Planifiée
              </div>
            </div>
          </div>
        </div>
        
        <div class="p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <span class="material-symbols-outlined text-amber-500 mr-3">nutrition</span>
              <div>
                <div class="text-sm font-medium text-gray-900 dark:text-white">Récolte des carottes</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Potager Sud - Planche 1</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-xs text-gray-500 dark:text-gray-400">Mercredi, 15:00</div>
              <div class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mt-1">
                À faire
              </div>
            </div>
          </div>
        </div>
        
        <div class="p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <span class="material-symbols-outlined text-purple-500 mr-3">eco</span>
              <div>
                <div class="text-sm font-medium text-gray-900 dark:text-white">Fertilisation des fraisiers</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Serre secondaire</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-xs text-gray-500 dark:text-gray-400">Jeudi, 09:00</div>
              <div class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mt-1">
                À faire
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> 