# Configuration de l'internationalisation (i18n)

Ce projet utilise l'intégration native d'Astro pour l'internationalisation (i18n). Cette configuration permet d'avoir une structure de projet propre avec des traductions automatiques des pages.

## Structure des fichiers

```
src/
├── i18n/
│   ├── fr/                      # Traductions françaises
│   │   ├── common/              # Éléments communs
│   │   │   ├── global.json      # Éléments globaux
│   │   │   ├── navigation.json  # Navigation
│   │   │   ├── footer.json      # Pied de page
│   │   │   └── auth.json        # Authentification
│   │   ├── pages/               # Pages
│   │   │   ├── home.json        # Page d'accueil
│   │   │   ├── about.json       # Page à propos
│   │   │   └── features/        # Fonctionnalités
│   │   │       ├── index.json   # Page principale des fonctionnalités
│   │   │       └── ...          # Autres fonctionnalités
│   │   └── admin/               # Administration
│   │       └── dashboard.json   # Tableau de bord
│   ├── en/                      # Traductions anglaises (même structure)
│   └── README.md                # Documentation sur l'i18n
├── pages/                       # Pages Astro (une seule version pour toutes les langues)
├── components/
│   └── Trans.astro             # Composant utilitaire pour les traductions
└── middleware.ts               # Middleware pour charger les traductions
```

## Comment ça fonctionne

1. Le système i18n natif d'Astro génère automatiquement des routes pour chaque langue configurée.
2. Notre middleware charge dynamiquement les fichiers de traduction appropriés en fonction de la langue de l'URL.
3. Les fichiers sont organisés dans une structure hiérarchique par section et par fonctionnalité.
4. Les traductions sont accessibles via `Astro.locals.t` dans les composants Astro.
5. Le composant `Trans.astro` permet d'utiliser facilement les clés de traduction dans les templates.

## Configuration

La configuration i18n se trouve dans `astro.config.mjs` :

```js
i18n: {
  defaultLocale: 'fr',    // Langue par défaut
  locales: ['fr', 'en'],  // Langues supportées
  routing: {
    prefixDefaultLocale: false  // Ne pas préfixer la langue par défaut
  }
}
```

## Utilisation

### Dans les composants Astro

```astro
---
import Trans from '../components/Trans.astro';
const { t } = Astro.locals;
---

<h1>{t('global.site_name')}</h1>
<p><Trans key="home.description" /></p>
```

### Pour les URLs et la navigation

Utilisez les fonctions d'aide d'Astro :

```astro
---
import { getRelativeLocaleUrl } from 'astro:i18n';
---

<a href={getRelativeLocaleUrl('fr', 'about')}>Version française</a>
<a href={getRelativeLocaleUrl('en', 'about')}>English version</a>
```

## Organisation des traductions

Les traductions sont organisées en sections logiques dans des fichiers JSON dédiés :

1. **common**: Éléments communs à toutes les pages
   - **global.json**: Nom du site, description, etc.
   - **navigation.json**: Liens de navigation
   - **footer.json**: Pied de page
   - **auth.json**: Authentification

2. **pages**: Traductions spécifiques aux pages
   - **home.json**: Page d'accueil
   - **about.json**: Page à propos
   - **features/**: Dossier avec les traductions pour les fonctionnalités
     - **index.json**: Page principale des fonctionnalités
     - **crop_management.json**: Gestion des cultures
     - etc.

3. **admin**: Traductions pour la partie administration
   - **dashboard.json**: Tableau de bord administrateur
   - etc.

Cette organisation permet un meilleur maintien des traductions et facilite la collaboration.

## Ajout d'une nouvelle langue

1. Créez un nouveau dossier `[langue]/` dans le dossier `src/i18n/`
2. Reproduisez la même structure de dossiers et fichiers que pour les langues existantes
3. Ajoutez la langue à la liste `locales` dans `astro.config.mjs`
4. Maintenez les mêmes clés de traduction pour toutes les langues 