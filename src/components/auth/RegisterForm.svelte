<script lang="ts">
  import Input from '../ui/Input.svelte';
  import Button from '../ui/Button.svelte';
  import { authStore } from '../../lib/stores/authStore';
  
  // États du formulaire
  let name = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let acceptTerms = false;
  let errors = { name: '', email: '', password: '', confirmPassword: '', terms: '', form: '' };
  let isSubmitting = false;
  
  // Validation du formulaire
  function validateForm() {
    let isValid = true;
    errors = { name: '', email: '', password: '', confirmPassword: '', terms: '', form: '' };
    
    if (!name.trim()) {
      errors.name = 'Le nom est requis';
      isValid = false;
    }
    
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
    } else if (password.length < 8) {
      errors.password = 'Le mot de passe doit contenir au moins 8 caractères';
      isValid = false;
    }
    
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Les mots de passe ne correspondent pas';
      isValid = false;
    }
    
    if (!acceptTerms) {
      errors.terms = 'Vous devez accepter les conditions d\'utilisation';
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
      // Appel à l'API d'inscription
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password
        }),
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (response.ok) {
        const user = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name || name
        };
        
        // Stocker l'utilisateur et le token dans le localStorage
        localStorage.setItem('user', JSON.stringify(user));
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        
        // Mettre à jour le store
        authStore.login(user, data.token);
        
        // Rediriger vers le dashboard
        window.location.href = '/dashboard';
      } else {
        errors.form = data.message || 'Une erreur est survenue lors de l\'inscription';
        
        // Gérer les erreurs spécifiques retournées par l'API
        if (data.errors) {
          if (data.errors.email) {
            errors.email = data.errors.email;
          }
          if (data.errors.password) {
            errors.password = data.errors.password;
          }
          if (data.errors.name) {
            errors.name = data.errors.name;
          }
        }
        
        authStore.setError(errors.form);
      }
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      errors.form = 'Une erreur est survenue lors de l\'inscription';
      authStore.setError('Une erreur est survenue lors de l\'inscription');
    } finally {
      isSubmitting = false;
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
  {#if errors.form}
    <div class="p-3 bg-red-100 border border-red-200 text-red-800 rounded-md">
      {errors.form}
    </div>
  {/if}
  
  <Input
    id="name"
    name="name"
    type="text"
    label="Nom complet"
    placeholder="Jean Dupont"
    required={true}
    autocomplete="name"
    bind:value={name}
    error={errors.name}
  />
  
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
    autocomplete="new-password"
    bind:value={password}
    error={errors.password}
  />
  
  <Input
    id="confirm-password"
    name="confirm-password"
    type="password"
    label="Confirmer le mot de passe"
    placeholder="••••••••"
    required={true}
    autocomplete="new-password"
    bind:value={confirmPassword}
    error={errors.confirmPassword}
  />
  
  <div class="flex items-start">
    <div class="flex items-center h-5">
      <input
        id="terms"
        name="terms"
        type="checkbox"
        class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        bind:checked={acceptTerms}
        aria-invalid={!!errors.terms}
      />
    </div>
    <div class="ml-3 text-sm">
      <label for="terms" class="font-medium text-gray-700 dark:text-gray-300">
        J'accepte les <a href="/terms" class="text-primary hover:underline">conditions d'utilisation</a> et la <a href="/privacy" class="text-primary hover:underline">politique de confidentialité</a>
      </label>
      {#if errors.terms}
        <p class="mt-1 text-sm text-red-500">{errors.terms}</p>
      {/if}
    </div>
  </div>
  
  <Button type="submit" fullWidth={true} loading={isSubmitting}>
    S'inscrire
  </Button>
  
  <div class="text-center mt-4">
    <p class="text-sm text-gray-600 dark:text-gray-400">
      Vous avez déjà un compte?
      <a href="/auth/login" class="font-medium text-primary hover:text-primary-600">
        Se connecter
      </a>
    </p>
  </div>
</form> 