<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import { dashboardStore, type DashboardSection } from '../../lib/stores/dashboardStore';
  
  const dispatch = createEventDispatcher();
  
  // État du menu
  export let isOpen = false;
  
  // Définition des liens de navigation (identiques à la sidebar)
  const navigationItems = [
    { 
      name: 'admin.dashboard.nav.dashboard', 
      section: 'main' as DashboardSection,
      icon: 'dashboard',
      current: true 
    },
    { 
      name: 'admin.dashboard.nav.terrains', 
      section: 'terrains' as DashboardSection,
      icon: 'terrain',
      current: false 
    },
    { 
      name: 'admin.dashboard.nav.espaces', 
      section: 'spaces' as DashboardSection,
      icon: 'grid_view',
      current: false 
    },
    { 
      name: 'admin.dashboard.nav.cultures', 
      section: 'cultures' as DashboardSection, 
      icon: 'grass',
      current: false 
    },
    { 
      name: 'admin.dashboard.nav.taches', 
      section: 'tasks' as DashboardSection,
      icon: 'event_note',
      current: false 
    },
    { 
      name: 'admin.dashboard.nav.calendrier', 
      section: 'calendar' as DashboardSection,
      icon: 'calendar_month',
      current: false 
    }
  ];
  
  // Autres sections
  const otherItems = [
    { 
      name: 'admin.dashboard.nav.parametres', 
      href: '/dashboard/parametres', 
      icon: 'settings',
      current: false 
    },
    { 
      name: 'admin.dashboard.nav.aide', 
      href: '/dashboard/aide', 
      icon: 'help',
      current: false 
    }
  ];
  
  function closeMenu() {
    isOpen = false;
    dispatch('close');
  }
  
  // Mettre à jour la section active
  function handleNavigation(section: DashboardSection) {
    dashboardStore.setActiveSection(section);
    closeMenu();
  }

  // S'abonner au store pour mettre à jour les états 'current'
  $: {
    navigationItems.forEach(item => {
      item.current = item.section === $dashboardStore.activeSection;
    });
  }
  
  // Écouter les événements personnalisés
  onMount(() => {
    // Récupérer l'élément parent
    const element = document.currentScript?.parentElement;
    
    if (element) {
      element.addEventListener('toggleMobileMenu', (event) => {
        const customEvent = event as CustomEvent;
        isOpen = customEvent.detail.isOpen;
      });
    }
    
    return () => {
      if (element) {
        element.removeEventListener('toggleMobileMenu', () => {});
      }
    };
  });
</script>

<div class="mobile-sidebar">
  {#if isOpen}
    <div 
      class="fixed inset-0 z-40 md:hidden"
      transition:slide={{ duration: 200 }}
    >
      <!-- Overlay arrière-plan semi-transparent -->
      <div 
        class="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
        on:click={closeMenu}
        aria-hidden="true"
      ></div>
      
      <!-- Contenu du menu -->
      <div class="fixed inset-y-0 left-0 flex max-w-xs w-full bg-white dark:bg-gray-800 shadow-xl">
        <!-- Menu -->
        <div class="flex flex-col w-full">
          <!-- En-tête avec logo et bouton de fermeture -->
          <div class="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
            <a href="/" class="flex items-center space-x-2">
              <span class="material-symbols-outlined text-green-600 text-2xl">eco</span>
              <span class="text-xl font-semibold dark:text-white">
              </span>
            </a>
            <button
              type="button"
              class="rounded-md text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              on:click={closeMenu}
            >
              <span class="sr-only">Fermer le menu</span>
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <!-- Navigation -->
          <nav class="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            <div class="space-y-1">
              {#each navigationItems as item}
                <button
                  on:click={() => handleNavigation(item.section)}
                  class="flex items-center w-full text-left px-3 py-2 text-sm font-medium rounded-lg {item.current 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'}"
                  aria-current={item.current ? 'page' : undefined}
                >
                  <span class="material-symbols-outlined mr-3">{item.icon}</span>

                </button>
              {/each}
            </div>
            
            <div class="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">

              </h3>
              <div class="mt-2 space-y-1">
                {#each otherItems as item}
                  <a
                    href={item.href}
                    class="flex items-center px-3 py-2 text-sm font-medium rounded-lg {item.current 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'}"
                    on:click={closeMenu}
                  >
                    <span class="material-symbols-outlined mr-3">{item.icon}</span>
                  </a>
                {/each}
              </div>
            </div>
          </nav>
          
          <!-- Pied de menu -->
          <div class="p-4 border-t border-gray-200 dark:border-gray-700">
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
                <p class="text-xs text-gray-500 dark:text-gray-400">

                </p>
              </div>
            </div>
            
            <!-- Sélecteur de langue -->
            <div class="mt-4">

            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div> 