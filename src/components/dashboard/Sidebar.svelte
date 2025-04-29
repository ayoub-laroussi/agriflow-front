<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import ThemeToggle from '../ui/DarkModeToggle.svelte';
  import Translate from '../ui/Translate.svelte';
  
  // Définition des liens de navigation
  const navigationItems = [
    { 
      name: 'dashboard.nav.dashboard', 
      href: '/dashboard', 
      icon: 'dashboard',
      current: true 
    },
    { 
      name: 'dashboard.nav.terrains', 
      href: '/dashboard/terrains', 
      icon: 'terrain',
      current: false 
    },
    { 
      name: 'dashboard.nav.espaces', 
      href: '/dashboard/espaces', 
      icon: 'grid_view',
      current: false 
    },
    { 
      name: 'dashboard.nav.cultures', 
      href: '/dashboard/cultures', 
      icon: 'grass',
      current: false 
    },
    { 
      name: 'dashboard.nav.actions', 
      href: '/dashboard/actions', 
      icon: 'event_note',
      current: false 
    },
    { 
      name: 'dashboard.nav.calendrier', 
      href: '/dashboard/calendrier', 
      icon: 'calendar_month',
      current: false 
    },
    { 
      name: 'dashboard.nav.observations', 
      href: '/dashboard/observations', 
      icon: 'visibility',
      current: false 
    }
  ];

  // Autres sections
  const otherItems = [
    { 
      name: 'dashboard.nav.parametres', 
      href: '/dashboard/parametres', 
      icon: 'settings',
      current: false 
    },
    { 
      name: 'dashboard.nav.aide', 
      href: '/dashboard/aide', 
      icon: 'help',
      current: false 
    }
  ];

  const dispatch = createEventDispatcher();

  function closeMenu() {
    dispatch('close');
  }
</script>

<div class="flex flex-col h-full border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
  <!-- Logo et nom du site -->
  <div class="flex items-center justify-center h-16 px-6 border-b border-gray-200 dark:border-gray-700">
    <a href="/" class="flex items-center space-x-2">
      <span class="material-symbols-outlined text-green-600 text-2xl">eco</span>
      <span class="text-xl font-semibold dark:text-white">
        <Translate key="global.site_name" />
      </span>
    </a>
  </div>

  <!-- Navigation principale -->
  <nav class="flex-1 overflow-y-auto px-4 py-4 space-y-1">
    <div class="space-y-1">
      {#each navigationItems as item}
        <a
          href={item.href}
          class="flex items-center px-3 py-2 text-sm font-medium rounded-lg {item.current 
            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100' 
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'}"
          aria-current={item.current ? 'page' : undefined}
        >
          <span class="material-symbols-outlined mr-3">{item.icon}</span>
          <Translate key={item.name} />
        </a>
      {/each}
    </div>

    <div class="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
      <h3 class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
        <Translate key="dashboard.nav.other" />
      </h3>
      <div class="mt-2 space-y-1">
        {#each otherItems as item}
          <a
            href={item.href}
            class="flex items-center px-3 py-2 text-sm font-medium rounded-lg {item.current 
              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100' 
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'}"
          >
            <span class="material-symbols-outlined mr-3">{item.icon}</span>
            <Translate key={item.name} />
          </a>
        {/each}
      </div>
    </div>
  </nav>

  <!-- Pied de sidebar avec switch de thème -->
  <div class="p-4 border-t border-gray-200 dark:border-gray-700">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <img
          class="w-8 h-8 rounded-full mr-2"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Avatar utilisateur"
        />
        <div>
          <p class="text-sm font-medium text-gray-700 dark:text-gray-200">
            Paul Dupont
          </p>
        </div>
      </div>
      <ThemeToggle />
    </div>
  </div>
</div> 