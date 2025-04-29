<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import LanguageSwitcher from '../ui/LanguageSwitcher.svelte';
  
  const dispatch = createEventDispatcher();
  
  // État pour contrôler l'ouverture du menu mobile
  let isMobileMenuOpen = false;
  let isProfileMenuOpen = false;
  let isNotificationOpen = false;
  
  // Notifications factices pour la démonstration
  let notifications = [
    { 
      id: 1, 
      title: 'Rappel d\'arrosage', 
      message: 'N\'oubliez pas d\'arroser le potager aujourd\'hui', 
      time: 'Il y a 10 minutes',
      read: false 
    },
    { 
      id: 2, 
      title: 'Récolte à planifier', 
      message: 'Les tomates seront prêtes à être récoltées dans 3 jours', 
      time: 'Il y a 2 heures',
      read: false 
    },
    { 
      id: 3, 
      title: 'Météo', 
      message: 'Alerte de gel prévue pour demain soir', 
      time: 'Hier',
      read: true 
    }
  ];
  
  // Nombre de notifications non lues
  $: unreadCount = notifications.filter(n => !n.read).length;
  
  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    
    // Créer un événement personnalisé pour communiquer avec le Layout
    const event = new CustomEvent('toggleMenu', { 
      detail: isMobileMenuOpen,
      bubbles: true  // Permettre à l'événement de remonter dans le DOM
    });
    
    // Déclencher l'événement depuis l'élément header
    if (typeof document !== 'undefined') {
      const header = document.querySelector('header');
      if (header) {
        header.dispatchEvent(event);
      }
    }
  }
  
  function toggleProfileMenu() {
    isProfileMenuOpen = !isProfileMenuOpen;
    if (isProfileMenuOpen) {
      isNotificationOpen = false;
    }
  }
  
  function toggleNotifications() {
    isNotificationOpen = !isNotificationOpen;
    if (isNotificationOpen) {
      isProfileMenuOpen = false;
    }
  }
  
  function markAsRead(id: number) {
    notifications = notifications.map(n => {
      if (n.id === id) {
        return { ...n, read: true };
      }
      return n;
    });
  }
  
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    
    if (isProfileMenuOpen && !target.closest('.profile-menu') && !target.closest('.profile-button')) {
      isProfileMenuOpen = false;
    }
    
    if (isNotificationOpen && !target.closest('.notification-menu') && !target.closest('.notification-button')) {
      isNotificationOpen = false;
    }
  }
  
  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 justify-between">
      <!-- Bouton mobile menu -->
      <div class="flex items-center md:hidden">
        <button
          type="button"
          class="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
          on:click={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
        >
          <span class="sr-only">Ouvrir le menu</span>
          <span class="material-symbols-outlined text-2xl">menu</span>
        </button>
      </div>
      
      <!-- Search bar -->
      <div class="flex-1 flex items-center justify-center md:justify-start">
        <div class="w-full max-w-lg lg:max-w-xs">
          <label for="search" class="sr-only">Rechercher</label>
          <div class="relative text-gray-400 focus-within:text-gray-600 dark:focus-within:text-gray-300">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="material-symbols-outlined">search</span>
            </div>
            <input
              id="search"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Rechercher..."
              type="search"
            >
          </div>
        </div>
      </div>
      
      <!-- Actions de droite -->
      <div class="flex items-center space-x-4">
        <!-- Sélecteur de langue -->
        <div class="hidden md:flex">
          <LanguageSwitcher />
        </div>
        
        <!-- Notifications -->
        <div class="relative">
          <button
            type="button"
            class="notification-button relative p-1 rounded-full text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            on:click={toggleNotifications}
          >
            <span class="sr-only">Voir les notifications</span>
            <span class="material-symbols-outlined">notifications</span>
            {#if unreadCount > 0}
              <span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white dark:ring-gray-800"></span>
            {/if}
          </button>
          
          {#if isNotificationOpen}
            <div
              class="notification-menu origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
            >
              <div class="py-1">
                <div class="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100">Notifications</h3>
                </div>
                {#if notifications.length === 0}
                  <div class="px-4 py-3">
                    <p class="text-sm text-gray-500 dark:text-gray-400">Aucune notification</p>
                  </div>
                {:else}
                  <div class="max-h-64 overflow-y-auto">
                    {#each notifications as notification}
                      <div 
                        class="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 {notification.read ? '' : 'bg-green-50 dark:bg-gray-750'}"
                        on:click={() => markAsRead(notification.id)}
                      >
                        <div class="flex justify-between">
                          <p class="text-sm font-medium text-gray-900 dark:text-white">
                            {notification.title}
                          </p>
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            {notification.time}
                          </p>
                        </div>
                        <p class="text-xs text-gray-600 dark:text-gray-300 mt-1">
                          {notification.message}
                        </p>
                      </div>
                    {/each}
                  </div>
                  <div class="px-4 py-2 text-center border-t border-gray-200 dark:border-gray-700">
                    <a href="/dashboard/notifications" class="text-xs text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300">
                      Voir toutes les notifications
                    </a>
                  </div>
                {/if}
              </div>
            </div>
          {/if}
        </div>
        
        <!-- Profil -->
        <div class="relative">
          <button
            type="button"
            class="profile-button flex max-w-xs items-center rounded-full bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            id="user-menu-button"
            aria-expanded="false"
            aria-haspopup="true"
            on:click={toggleProfileMenu}
          >
            <span class="sr-only">Ouvrir le menu utilisateur</span>
            <img
              class="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Avatar utilisateur"
            >
          </button>
          
          {#if isProfileMenuOpen}
            <div
              class="profile-menu origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabindex="-1"
            >
              <a
                href="/dashboard/profil"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                role="menuitem"
              >
                Mon profil
              </a>
              <a
                href="/dashboard/parametres"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                role="menuitem"
              >
                Paramètres
              </a>
              <a
                href="/logout"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                role="menuitem"
              >
                Se déconnecter
              </a>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</header> 