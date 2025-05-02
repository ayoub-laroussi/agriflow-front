import { writable } from 'svelte/store';

export type DashboardSection = 'main' | 'tasks' | 'spaces' | 'calendar' | 'cultures' | 'terrains';

interface DashboardState {
  activeSection: DashboardSection;
}

// Création d'un store pour l'état du dashboard
function createDashboardStore() {
  const initialState: DashboardState = {
    activeSection: 'main'
  };

  const { subscribe, update, set } = writable<DashboardState>(initialState);

  return {
    subscribe,
    
    // Changer la section active
    setActiveSection: (section: DashboardSection) => {
      update(state => ({ ...state, activeSection: section }));
    },
    
    // Réinitialiser le store
    reset: () => set(initialState)
  };
}

// Exportation de l'instance du store
export const dashboardStore = createDashboardStore(); 