<script lang="ts">
import { onMount } from 'svelte';
import { currentLang } from '../../lib/stores/i18nStore';
import { t } from '../../lib/utils/i18n';

/**
 * Clé de traduction à utiliser
 * Format: "section.sous-section.cle" (ex: "navigation.home")
 */
export let key: string;

/**
 * Paramètres à injecter dans la traduction
 * Les valeurs {paramName} dans la traduction seront remplacées
 * par les valeurs correspondantes
 */
export let params: Record<string, string | number> = {};

// État local pour stocker la traduction
let translation = '';

// Met à jour la traduction quand la langue ou les props changent
$: {
  if ($currentLang) {
    updateTranslation();
  }
}

$: {
  if (key || Object.keys(params).length) {
    updateTranslation();
  }
}

// Fonction pour mettre à jour la traduction
function updateTranslation(): void {
  if (typeof window !== 'undefined' && window.translations) {
    translation = t(key, params, $currentLang);
  }
}

// Initialiser la traduction au montage du composant
onMount(() => {
  updateTranslation();
  
  // Écouter également les événements de chargement des traductions
  const handleTranslationsLoaded = () => {
    updateTranslation();
  };
  
  window.addEventListener('translations-loaded', handleTranslationsLoaded);
  window.addEventListener('language-changed', handleTranslationsLoaded);
  
  return () => {
    window.removeEventListener('translations-loaded', handleTranslationsLoaded);
    window.removeEventListener('language-changed', handleTranslationsLoaded);
  };
});
</script>

{#if translation}
  <span>{translation}</span>
{:else}
  <span>{key}</span>
{/if} 