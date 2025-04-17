/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-dark': '#1B5E20',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        'secondary-dark': '#388E3C',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        light: 'rgb(var(--color-light) / <alpha-value>)',
        text: 'rgb(var(--color-text) / <alpha-value>)',
        'text-light': 'rgb(var(--color-text-light) / <alpha-value>)',
        background: '#FFFFFF',
      },
    },
  },
  plugins: [],
} 