/**
 * Types pour l'internationalisation (i18n)
 */

import type { Lang } from './index';

/**
 * Type pour les clés de traduction
 * Permet de créer un type qui représente toutes les clés de traduction possibles
 * en format "dot notation" (ex: "navigation.home")
 */
export type TranslationKey = string;

/**
 * Type pour les options de langue
 */
export interface LangOption {
  code: string;
  name: string;
  flag?: string;
}

/**
 * Type pour les traductions
 * Permet de typer les objets de traduction
 */
export interface Translations {
  global: {
    site_name: string;
    site_description: string;
    dark_mode: {
      toggle_light: string;
      toggle_dark: string;
    };
    language: {
      switch: string;
      fr: string;
      en: string;
    };
  };
  navigation: {
    home: string;
    features: string;
    solutions: string;
    demo: string;
    contact: string;
    login: string;
    register: string;
  };
  hero: {
    tagline: string;
    title: string;
    description: string;
    cta: string;
    stats: {
      spaces: string;
      statuses: string;
      actions: string;
      traceability: string;
    };
  };
  features: {
    title: string;
    subtitle: string;
    list: {
      landManagement: {
        title: string;
        description: string;
      };
      cropTracking: {
        title: string;
        description: string;
      };
      agriculturalActions: {
        title: string;
        description: string;
      };
      calendar: {
        title: string;
        description: string;
      };
      observations: {
        title: string;
        description: string;
      };
      collaboration: {
        title: string;
        description: string;
      };
    };
    traceability: {
      title: string;
      description: string;
      caption: string;
    };
  };
  footer: {
    about: {
      title: string;
      company: string;
      privacy: string;
      terms: string;
      legal: string;
    };
    contact: {
      title: string;
      email: string;
      phone: string;
      address: string;
    };
    copyright: string;
  };
}

/**
 * Déclare les types globaux pour le contexte client
 */
declare global {
  interface Window {
    APP_LANGUAGE: {
      current: string;
      available: string[];
    };
    translations: Record<string, Translations>;
  }
} 