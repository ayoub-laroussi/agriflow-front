export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface NavLink {
  href: string;
  text: string;
  isExternal?: boolean;
}

export interface FooterLink extends NavLink {
  icon?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

/**
 * Type représentant les langues supportées par l'application
 */
export type Lang = 'fr' | 'en';

export interface LangOption {
  code: string;
  name: string;
  flag?: string;
} 