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
  token: string | null;
}

function createAuthStore() {
  const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    token: null
  };

  const { subscribe, update, set } = writable<AuthState>(initialState);

  return {
    subscribe,
    
    // Démarrer le processus d'authentification (mettre isLoading à true)
    startLoading: () => {
      update(state => ({ ...state, isLoading: true, error: null }));
    },
    
    // Définir l'utilisateur après connexion réussie
    login: (user: User, token?: string) => {
      update(state => ({ 
        ...state, 
        user, 
        isAuthenticated: true, 
        isLoading: false,
        error: null,
        token: token || state.token
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
    logout: async () => {
      // Essayer de déconnecter via l'API
      try {
        await fetch('http://localhost:3000/api/auth/logout', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
      }
      
      // Supprimer les données locales
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      // Réinitialiser le store
      set(initialState);
    },
    
    // Vérifier si l'utilisateur est connecté
    checkAuth: async () => {
      update(state => ({ ...state, isLoading: true }));
      
      // Vérifier s'il y a un token stocké
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      try {
        // Vérifier l'authentification via l'API
        const response = await fetch('http://localhost:3000/api/auth/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(storedToken ? { 'Authorization': `Bearer ${storedToken}` } : {})
          },
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          const user = {
            id: data.id,
            email: data.email,
            name: data.name || data.username || data.email
          };
          
          update(state => ({ 
            ...state, 
            user,
            token: storedToken,
            isAuthenticated: true,
            isLoading: false
          }));
        } else {
          // Si l'API a échoué mais que nous avons un utilisateur stocké localement,
          // nous utilisons les données locales temporairement
          if (storedUser) {
            try {
              const user = JSON.parse(storedUser);
              update(state => ({ 
                ...state, 
                user,
                token: storedToken,
                isAuthenticated: true,
                isLoading: false
              }));
            } catch (e) {
              localStorage.removeItem('user');
              localStorage.removeItem('token');
              update(state => ({ ...state, isLoading: false }));
            }
          } else {
            update(state => ({ ...state, isLoading: false }));
          }
        }
      } catch (error) {
        console.error('Erreur lors de la vérification d\'authentification:', error);
        
        // En cas d'erreur, essayer d'utiliser les données locales
        if (storedUser) {
          try {
            const user = JSON.parse(storedUser);
            update(state => ({ 
              ...state, 
              user,
              token: storedToken,
              isAuthenticated: true,
              isLoading: false
            }));
          } catch (e) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            update(state => ({ ...state, isLoading: false }));
          }
        } else {
          update(state => ({ ...state, isLoading: false }));
        }
      }
    }
  };
}

export const authStore = createAuthStore(); 