/// <reference types="astro/client" />

interface ImportMetaEnv {
  // Ajouter ici vos variables d'environnement
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    t: (key: string) => string;
  }
} 