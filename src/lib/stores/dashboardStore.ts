import { writable } from 'svelte/store';

export type DashboardSection = 'main' | 'tasks' | 'spaces' | 'calendar' | 'cultures' | 'terrains';

interface DashboardState {
  activeSection: DashboardSection;
}

// Création d'un store pour l'état du dashboard
function createDashboardStore() {
  // Vérifier si nous sommes côté client pour éviter les erreurs SSR
  const isBrowser = typeof window !== 'undefined';
  
  // Initialiser avec la section principale
  const initialState: DashboardState = {
    activeSection: 'main'
  };

  // Log pour débugger
  if (isBrowser) {
    console.log('Initializing dashboard store with:', initialState);
  }

  const { subscribe, update, set } = writable<DashboardState>(initialState);

  return {
    subscribe,
    
    // Changer la section active
    setActiveSection: (section: DashboardSection) => {
      if (isBrowser) {
        console.log('Setting active section to:', section);
      }
      update(state => ({ ...state, activeSection: section }));
    },
    
    // Réinitialiser le store
    reset: () => set(initialState)
  };
}

// Exportation de l'instance du store
export const dashboardStore = createDashboardStore(); 