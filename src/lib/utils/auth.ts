import type { AstroGlobal } from 'astro';
import { authStore } from '../stores/authStore';
import { get } from 'svelte/store';

/**
 * Vérifie si l'utilisateur est authentifié côté client
 * @returns {boolean} true si l'utilisateur est authentifié
 */
export function isAuthenticated(): boolean {
  // Dans un contexte client
  if (typeof window !== 'undefined') {
    const $authStore = get(authStore);
    
    // Vérifier si l'utilisateur est déjà connecté via le store
    if ($authStore.isAuthenticated) {
      return true;
    }
    
    // Vérifier le localStorage si le store n'a pas encore été initialisé
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        // Mettre à jour le store avec l'utilisateur stocké
        const user = JSON.parse(storedUser);
        authStore.login(user);
        return true;
      } catch (e) {
        // En cas d'erreur, supprimer l'entrée du localStorage
        localStorage.removeItem('user');
      }
    }
  }
  
  return false;
}

/**
 * Middleware Astro pour protéger les routes qui nécessitent une authentification
 * @param Astro - Contexte Astro global
 * @returns {Promise<Response | void>} Redirige vers la page de connexion si non authentifié
 */
export async function protectRoute(Astro: AstroGlobal): Promise<Response | void> {
  // Cette fonction est exécutée côté serveur
  // Dans un contexte réel, nous vérifierions un cookie de session
  // ou un JWT dans les en-têtes
  
  // Pour la démo, nous redirigeons toujours vers la page de connexion
  // Le côté client vérifiera le localStorage et redirigera vers le dashboard si nécessaire
  return Astro.redirect('/auth/login');
} 