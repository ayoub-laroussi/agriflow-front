<script lang="ts">
  export let title: string;
  export let subtitle: string = '';
</script>

<div class="w-full max-w-md mx-auto px-4 py-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
  <div class="text-center mb-6">
    <h1 class="text-2xl font-bold">{title}</h1>
    {#if subtitle}
      <p class="text-gray-600 dark:text-gray-400 mt-2">{subtitle}</p>
    {/if}
  </div>
  
  <div class="space-y-6">
    <slot />
  </div>
</div> 