<script lang="ts">
  import { onMount } from 'svelte';
  import Input from '../ui/Input.svelte';
  import Button from '../ui/Button.svelte';
  import { authStore } from '../../lib/stores/authStore';
  
  // États du formulaire
  let email = '';
  let password = '';
  let rememberMe = false;
  let errors = { email: '', password: '', form: '' };
  let isSubmitting = false;
  
  // Validation du formulaire
  function validateForm() {
    let isValid = true;
    errors = { email: '', password: '', form: '' };
    
    if (!email) {
      errors.email = 'L\'email est requis';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'L\'email n\'est pas valide';
      isValid = false;
    }
    
    if (!password) {
      errors.password = 'Le mot de passe est requis';
      isValid = false;
    }
    
    return isValid;
  }
  
  // Soumission du formulaire
  async function handleSubmit() {
    if (!validateForm()) return;
    
    isSubmitting = true;
    authStore.startLoading();
    
    try {
      // Appel à l'API d'authentification
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (response.ok) {
        const user = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name || data.user.username || email
        };
        
        // Stocker dans localStorage si "Se souvenir de moi" est coché
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(user));
          // Stocker le token si présent dans la réponse
          if (data.token) {
            localStorage.setItem('token', data.token);
          }
        }
        
        // Mettre à jour le store
        authStore.login(user);
        
        // Rediriger vers le dashboard
        window.location.href = '/dashboard';
      } else {
        errors.form = data.message || 'Email ou mot de passe incorrect';
        authStore.setError(errors.form);
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      errors.form = 'Une erreur est survenue lors de la connexion';
      authStore.setError('Une erreur est survenue lors de la connexion');
    } finally {
      isSubmitting = false;
    }
  }
  
  onMount(() => {
    // Vérifier si l'utilisateur est déjà connecté
    authStore.checkAuth();
  });
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
  {#if errors.form}
    <div class="p-3 bg-red-100 border border-red-200 text-red-800 rounded-md">
      {errors.form}
    </div>
  {/if}
  
  <Input
    id="email"
    name="email"
    type="email"
    label="Email"
    placeholder="votre@email.com"
    required={true}
    autocomplete="email"
    bind:value={email}
    error={errors.email}
  />
  
  <Input
    id="password"
    name="password"
    type="password"
    label="Mot de passe"
    placeholder="••••••••"
    required={true}
    autocomplete="current-password"
    bind:value={password}
    error={errors.password}
  />
  
  <div class="flex items-center justify-between">
    <div class="flex items-center">
      <input
        id="remember-me"
        name="remember-me"
        type="checkbox"
        class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        bind:checked={rememberMe}
      />
      <label for="remember-me" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
        Se souvenir de moi
      </label>
    </div>
    
    <a href="/auth/reset-password" class="text-sm font-medium text-primary hover:text-primary-600">
      Mot de passe oublié?
    </a>
  </div>
  
  <Button type="submit" fullWidth={true} loading={isSubmitting}>
    Se connecter
  </Button>
  
  <div class="text-center mt-4">
    <p class="text-sm text-gray-600 dark:text-gray-400">
      Vous n'avez pas de compte?
      <a href="/auth/register" class="font-medium text-primary hover:text-primary-600">
        S'inscrire
      </a>
    </p>
  </div>
</form> 