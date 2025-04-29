// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
    tailwind(),
    // I18n est temporairement désactivé pour résoudre les problèmes d'importation
  ],
  output: 'server',
  adapter: cloudflare(),
  vite: {
    ssr: {
      // Nécessaire pour Cloudflare qui ne prend pas en charge certains modules Node
      external: ['node:async_hooks']
    }
  }
});