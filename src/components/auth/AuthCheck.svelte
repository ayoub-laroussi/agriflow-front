<script lang="ts">
  import { onMount } from 'svelte';
  import { authStore } from '../../lib/stores/authStore';
  
  // mode: 'protected' - redirige vers /auth/login si non connecté
  // mode: 'guest' - redirige vers /dashboard si déjà connecté
  export let mode: 'protected' | 'guest' = 'protected';
  export let redirectTo: string = mode === 'protected' ? '/auth/login' : '/dashboard';
  
  // Gestion de la redirection
  function checkAuth() {
    // Récupérer l'état actuel du store
    let { isAuthenticated } = $authStore;
    
    // Si le store n'est pas encore initialisé, vérifier le localStorage
    if (!isAuthenticated) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          authStore.login(user);
          isAuthenticated = true;
        } catch (e) {
          localStorage.removeItem('user');
          isAuthenticated = false;
        }
      }
    }
    
    // Rediriger en fonction du mode et de l'état d'authentification
    if ((mode === 'protected' && !isAuthenticated) || 
        (mode === 'guest' && isAuthenticated)) {
      window.location.href = redirectTo;
    }
  }
  
  // Vérifier l'authentification au montage du composant
  onMount(() => {
    checkAuth();
    
    // S'abonner aux changements d'état d'authentification
    const unsubscribe = authStore.subscribe(state => {
      if ((mode === 'protected' && !state.isAuthenticated) || 
          (mode === 'guest' && state.isAuthenticated)) {
        window.location.href = redirectTo;
      }
    });
    
    return unsubscribe;
  });
</script>

<!-- Ce composant ne rend rien visuellement -->
<span class="hidden"></span> 