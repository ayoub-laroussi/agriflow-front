<script lang="ts">
  // Stats et données récentes pour le tableau de bord
  import Translate from '../ui/Translate.svelte';
  import { t } from '../../lib/utils/i18n';
  
  // Statistiques de l'exploitation
  const stats = [
    { name: 'dashboard.stats.terrains', value: '5', icon: 'terrain', color: 'bg-green-100 text-green-800' },
    { name: 'dashboard.stats.espaces', value: '12', icon: 'grid_view', color: 'bg-blue-100 text-blue-800' },
    { name: 'dashboard.stats.cultures', value: '24', icon: 'grass', color: 'bg-amber-100 text-amber-800' },
    { name: 'dashboard.stats.actions', value: '16', icon: 'event_note', color: 'bg-purple-100 text-purple-800' }
  ];
  
  // Actions récentes
  const recentActions = [
    {
      id: 1,
      type: 'dashboard.actions.arrosage',
      icon: 'water_drop',
      iconColor: 'text-blue-500',
      location: 'Potager Nord - Planche 3',
      date: '10/06/2023 à 08:15',
      status: 'dashboard.status.termine'
    },
    {
      id: 2,
      type: 'dashboard.actions.plantation',
      icon: 'grass',
      iconColor: 'text-green-500',
      location: 'Potager Est - Planche 1',
      date: '09/06/2023 à 14:30',
      status: 'dashboard.status.termine'
    },
    {
      id: 3,
      type: 'dashboard.actions.fertilisation',
      icon: 'compost',
      iconColor: 'text-amber-500',
      location: 'Verger - Zone A',
      date: '08/06/2023 à 10:45',
      status: 'dashboard.status.termine'
    },
    {
      id: 4,
      type: 'dashboard.actions.taille',
      icon: 'cut',
      iconColor: 'text-red-500',
      location: 'Verger - Zone B',
      date: '07/06/2023 à 16:20',
      status: 'dashboard.status.termine'
    }
  ];
  
  // Événements à venir
  const upcomingEvents = [
    {
      id: 1,
      title: 'dashboard.events.arrosage',
      date: 'Aujourd\'hui, 17:00',
      location: 'Potager Sud'
    },
    {
      id: 2,
      title: 'dashboard.events.recolte',
      date: 'Demain, 08:30',
      location: 'Potager Est'
    },
    {
      id: 3,
      title: 'dashboard.events.traitement',
      date: '15/06/2023, 10:00',
      location: 'Verger'
    }
  ];
  
  // Cultures actives
  const activeCultures = [
    {
      id: 1,
      name: 'Tomates Roma',
      status: 'dashboard.culture.croissance',
      location: 'Potager Sud',
      progress: 45
    },
    {
      id: 2,
      name: 'Laitue Batavia',
      status: 'dashboard.culture.recolte',
      location: 'Potager Nord',
      progress: 95
    },
    {
      id: 3,
      name: 'Carottes Nantaises',
      status: 'dashboard.culture.croissance',
      location: 'Potager Est',
      progress: 60
    },
    {
      id: 4,
      name: 'Pommes Golden',
      status: 'dashboard.culture.floraison',
      location: 'Verger',
      progress: 25
    }
  ];
</script>

<div class="container mx-auto">
  <!-- En-tête avec bienvenue et date -->
  <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
    <div>
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
        <Translate key="dashboard.greeting" params={{name: "Paul"}} />
      </h1>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        <Translate key="dashboard.overview" />
      </p>
    </div>
    <div class="mt-4 md:mt-0">
      <div class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700">
        <span class="material-symbols-outlined mr-2">today</span>
        <span>11 juin 2023</span>
      </div>
    </div>
  </div>
  
  <!-- Stats cards -->
  <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
    {#each stats as stat}
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="{stat.color} rounded-md p-3">
                <span class="material-symbols-outlined">{stat.icon}</span>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  <Translate key={stat.name} />
                </dt>
                <dd>
                  <div class="text-lg font-medium text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
  
  <!-- Main content -->
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
    <!-- Actions récentes -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg col-span-1 xl:col-span-2">
      <div class="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center">
          <span class="material-symbols-outlined mr-2">history</span>
          <Translate key="dashboard.recent_actions" />
        </h3>
      </div>
      <div class="overflow-hidden">
        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
          {#each recentActions as action}
            <li>
              <div class="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <span class="material-symbols-outlined {action.iconColor}">{action.icon}</span>
                  </div>
                  <div class="ml-4 flex-1">
                    <div class="flex justify-between">
                      <p class="text-sm font-medium text-gray-900 dark:text-white">
                        <Translate key={action.type} />
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        {action.date}
                      </p>
                    </div>
                    <div class="flex justify-between">
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        {action.location}
                      </p>
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        <Translate key={action.status} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          {/each}
        </ul>
        <div class="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-center">
          <a href="/dashboard/actions" class="text-sm font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300">
            <Translate key="dashboard.see_all_actions" />
          </a>
        </div>
      </div>
    </div>
    
    <!-- Événements à venir -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div class="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center">
          <span class="material-symbols-outlined mr-2">event</span>
          <Translate key="dashboard.upcoming" />
        </h3>
      </div>
      <div class="overflow-hidden">
        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
          {#each upcomingEvents as event}
            <li>
              <div class="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  <Translate key={event.title} />
                </p>
                <div class="mt-1 flex justify-between">
                  <p class="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <span class="material-symbols-outlined text-xs mr-1">schedule</span>
                    {event.date}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <span class="material-symbols-outlined text-xs mr-1">place</span>
                    {event.location}
                  </p>
                </div>
              </div>
            </li>
          {/each}
        </ul>
        <div class="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-center">
          <a href="/dashboard/calendrier" class="text-sm font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300">
            <Translate key="dashboard.see_calendar" />
          </a>
        </div>
      </div>
    </div>

    <!-- Cultures actives -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg col-span-1 xl:col-span-2">
      <div class="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center">
          <span class="material-symbols-outlined mr-2">grass</span>
          <Translate key="dashboard.active_cultures" />
        </h3>
      </div>
      <div class="overflow-hidden">
        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
          {#each activeCultures as culture}
            <li>
              <div class="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    {culture.name}
                  </p>
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                    <Translate key={culture.status} />
                  </span>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {culture.location}
                </p>
                <div class="relative pt-1">
                  <div class="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                    <div 
                      style="width: {culture.progress}%" 
                      class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500">
                    </div>
                  </div>
                  <div class="flex justify-between text-xs mt-1">
                    <span class="text-gray-500 dark:text-gray-400">
                      <Translate key="dashboard.progress" />
                    </span>
                    <span class="font-semibold text-gray-600 dark:text-gray-300">{culture.progress}%</span>
                  </div>
                </div>
              </div>
            </li>
          {/each}
        </ul>
        <div class="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-center">
          <a href="/dashboard/cultures" class="text-sm font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300">
            <Translate key="dashboard.see_all_cultures" />
          </a>
        </div>
      </div>
    </div>
    
    <!-- Météo et observations -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div class="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center">
          <span class="material-symbols-outlined mr-2">partly_cloudy_day</span>
          <Translate key="dashboard.weather" />
        </h3>
      </div>
      <div class="p-6 text-center">
        <div class="flex justify-center items-center mb-4">
          <span class="material-symbols-outlined text-5xl text-yellow-500">wb_sunny</span>
        </div>
        <h4 class="text-2xl font-bold text-gray-900 dark:text-white">25°C</h4>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
          <Translate key="dashboard.weather.sunny" />
        </p>
        <div class="mt-6 grid grid-cols-3 gap-3 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              <Translate key="dashboard.weather.humidity" />
            </p>
            <p class="text-sm font-medium text-gray-900 dark:text-white mt-1">45%</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              <Translate key="dashboard.weather.wind" />
            </p>
            <p class="text-sm font-medium text-gray-900 dark:text-white mt-1">10 km/h</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              <Translate key="dashboard.weather.precipitation" />
            </p>
            <p class="text-sm font-medium text-gray-900 dark:text-white mt-1">0 mm</p>
          </div>
        </div>
        <div class="mt-6 text-center">
          <a href="/dashboard/observations" class="text-sm font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300">
            <Translate key="dashboard.record_observation" />
          </a>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Bouton d'ajout fixe -->
  <div class="fixed right-6 bottom-6">
    <button
      type="button"
      class="inline-flex items-center p-3 border border-transparent rounded-full shadow-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      aria-label={t('dashboard.add_new')}
    >
      <span class="material-symbols-outlined">add</span>
    </button>
  </div>
</div> 