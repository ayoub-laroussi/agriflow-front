# Meilleures pratiques pour l'internationalisation sans duplication de pages

## Introduction

Ce document explique comment éviter la duplication de pages pour chaque langue tout en utilisant l'intégration native d'Astro pour l'internationalisation (i18n).

## Le problème

Par défaut, l'approche naïve consiste à créer des répertoires séparés pour chaque langue (`/pages/` pour le français, `/pages/en/` pour l'anglais), ce qui entraîne une duplication du code et des problèmes de maintenance.

## Solution recommandée

### 1. Utiliser le middleware i18n

Notre projet dispose déjà d'un middleware puissant qui :
- Charge dynamiquement les traductions appropriées en fonction de la langue détectée
- Expose une fonction `t()` via `Astro.locals.t` pour accéder aux traductions
- Gère automatiquement la détection de la langue à partir de l'URL

### 2. Créer des pages universelles

Au lieu de dupliquer vos pages, créez une seule version qui utilise la fonction `t()` pour afficher le contenu dans la langue appropriée.

**Exemple de page universelle :**

```astro
---
// Importations nécessaires
import Layout from '../layouts/Layout.astro';
import { getRelativeLocaleUrl } from 'astro:i18n';

// Récupérer la langue actuelle à partir de l'URL
const currentLocale = Astro.url.pathname.split('/')[1] === 'en' ? 'en' : 'fr';

// Obtenir la fonction de traduction du middleware
const { t } = Astro.locals;

// Précharger les traductions couramment utilisées
const pageTitle = t('maPage.titre');
const introduction = t('maPage.introduction');
---

<Layout title={pageTitle}>
  <main>
    <h1>{pageTitle}</h1>
    <p>{introduction}</p>
    
    <!-- Contenu dynamique -->
    <div>
      {t('maPage.contenu')}
    </div>
    
    <!-- Liens avec langue préservée -->
    <a href={getRelativeLocaleUrl(currentLocale, 'autre-page')}>
      {t('navigation.lien')}
    </a>
    
    <!-- Sélecteur de langue -->
    <div>
      <a href="/ma-page">Français</a>
      <a href="/en/ma-page">English</a>
    </div>
  </main>
</Layout>
```

### 3. Fichiers de traduction

Organisez vos traductions selon la structure suivante :

```
src/
└── i18n/
    ├── fr/
    │   ├── common/
    │   │   └── global.json
    │   └── pages/
    │       └── ma-page.json
    └── en/
        ├── common/
        │   └── global.json
        └── pages/
            └── ma-page.json
```

**Exemple de fichier de traduction (`fr/pages/ma-page.json`) :**

```json
{
  "titre": "Titre de ma page",
  "introduction": "Introduction en français",
  "contenu": "Contenu détaillé en français"
}
```

## Exemple concret

Vous pouvez voir un exemple fonctionnel de cette approche dans la page `/demo-i18n`.

## Avantages

- **Maintenance simplifiée** : une seule source de vérité pour chaque page
- **Cohérence** : garantit que toutes les versions linguistiques ont le même contenu structurel
- **Performances** : réduit la taille du codebase
- **Flexibilité** : facilite l'ajout de nouvelles langues (il suffit d'ajouter les fichiers de traduction)

## Migration des pages existantes

Pour migrer une page existante du modèle dupliqué vers le modèle universel :

1. Gardez la version dans `/pages/`
2. Supprimez la version dupliquée dans `/pages/en/`
3. Modifiez la page restante pour utiliser la fonction `t()` pour tous les textes
4. Assurez-vous que tous les textes sont définis dans les fichiers de traduction 