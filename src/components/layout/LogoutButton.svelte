<script lang="ts">
  import { authStore } from '../../lib/stores/authStore';
  import Button from '../ui/Button.svelte';
  
  export let variant: 'primary' | 'secondary' | 'outline' | 'danger' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  
  // Fonction de déconnexion
  function handleLogout() {
    // Supprimer l'utilisateur du localStorage
    localStorage.removeItem('user');
    
    // Mettre à jour le store
    authStore.logout();
    
    // Rediriger vers la page d'accueil
    window.location.href = '/';
  }
</script>

<Button 
  type="button" 
  on:click={handleLogout} 
  {variant} 
  {size}
>
  <slot>Se déconnecter</slot>
</Button> 