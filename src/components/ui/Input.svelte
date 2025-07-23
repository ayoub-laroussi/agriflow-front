<script lang="ts">
  export let id: string;
  export let label: string;
  export let type: string = 'text';
  export let name: string = '';
  export let placeholder: string = '';
  export let value: string = '';
  export let required: boolean = false;
  export let error: string = '';
  export let disabled: boolean = false;
  
  // Optionnel: propriétés supplémentaires
  export let autocomplete: 'on' | 'off' | 'name' | 'email' | 'username' | 'new-password' | 'current-password' | '' = '';
  export let min: string = '';
  export let max: string = '';
  export let pattern: string = '';
</script>

<div class="mb-4">
  <label for={id} class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{label}{required ? ' *' : ''}</label>
  <input
    {id}
    {name}
    {type}
    {placeholder}
    {disabled}
    {autocomplete}
    {min}
    {max}
    {pattern}
    {required}
    bind:value
    class="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-60 disabled:cursor-not-allowed
    {error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''}"
    aria-invalid={!!error}
    aria-describedby={error ? `${id}-error` : undefined}
  />
  {#if error}
    <p id="{id}-error" class="mt-1 text-sm text-red-500">{error}</p>
  {/if}
</div> 