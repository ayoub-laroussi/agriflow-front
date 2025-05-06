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
  ],
  output: 'server',
  adapter: cloudflare(),
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: false,
      strategy: 'pathname'
    }
  },
  vite: {
    ssr: {
      // Nécessaire pour Cloudflare qui ne prend pas en charge certains modules Node
      external: ['node:async_hooks']
    }
  }
});