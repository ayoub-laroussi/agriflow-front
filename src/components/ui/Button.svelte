<script lang="ts">
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let variant: 'primary' | 'secondary' | 'outline' | 'danger' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let fullWidth: boolean = false;
  export let disabled: boolean = false;
  export let loading: boolean = false;
  
  // Calculer les classes en fonction des props
  $: variantClasses = {
    primary: 'bg-primary hover:bg-primary-600 text-white',
    secondary: 'bg-secondary hover:bg-secondary-600 text-white',
    outline: 'border border-primary hover:bg-primary/10 text-primary',
    danger: 'bg-red-500 hover:bg-red-600 text-white'
  }[variant];
  
  $: sizeClasses = {
    sm: 'text-sm py-1 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-3 px-6'
  }[size];
  
  $: widthClass = fullWidth ? 'w-full' : '';
  $: disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
</script>

<button
  {type}
  {disabled}
  class="flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 {variantClasses} {sizeClasses} {widthClass} {disabledClass}"
  on:click
>
  {#if loading}
    <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  {/if}
  <slot />
</button> 