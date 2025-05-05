import { writable } from 'svelte/store';

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

function createAuthStore() {
  const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  };

  const { subscribe, update, set } = writable<AuthState>(initialState);

  return {
    subscribe,
    
    // Démarrer le processus d'authentification (mettre isLoading à true)
    startLoading: () => {
      update(state => ({ ...state, isLoading: true, error: null }));
    },
    
    // Définir l'utilisateur après connexion réussie
    login: (user: User) => {
      update(state => ({ 
        ...state, 
        user, 
        isAuthenticated: true, 
        isLoading: false,
        error: null
      }));
    },
    
    // Gérer les erreurs d'authentification
    setError: (error: string) => {
      update(state => ({ 
        ...state, 
        error, 
        isLoading: false 
      }));
    },
    
    // Déconnecter l'utilisateur
    logout: () => {
      set(initialState);
    },
    
    // Vérifier si l'utilisateur est connecté (à utiliser pour la persistance)
    checkAuth: () => {
      // Ici nous simulons la vérification, mais dans un environnement réel,
      // nous vérifierions les tokens JWT ou la session
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          update(state => ({ 
            ...state, 
            user, 
            isAuthenticated: true 
          }));
        } catch (e) {
          localStorage.removeItem('user');
        }
      }
    }
  };
}

export const authStore = createAuthStore(); 