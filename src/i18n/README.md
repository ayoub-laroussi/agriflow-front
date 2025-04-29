# Système d'internationalisation (i18n) AgriFlow

Ce dossier contient les fichiers de traduction et la configuration pour le système d'internationalisation d'AgriFlow.

## Structure

- `en.json` - Traductions en anglais
- `fr.json` - Traductions en français
- `README.md` - Ce fichier explicatif

## Utilisation

### Dans les composants Astro

Pour utiliser les traductions dans les composants Astro, importez la fonction `t` de la bibliothèque `astro-i18n` :

```astro
---
import { t } from 'astro-i18n';
---

<h1>{t('global.site_name')}</h1>
<p>{t('hero.description')}</p>
```

### Dans les composants Svelte

Pour les composants Svelte, nous avons plusieurs options :

#### Option 1: Composant Translate

Le composant `Translate` est le moyen le plus simple d'afficher des traductions :

```svelte
<script>
import Translate from '../components/ui/Translate.svelte';
</script>

<Translate key="navigation.home" />
```

Avec paramètres :

```svelte
<Translate key="footer.copyright" params={{ year: 2023 }} />
```

#### Option 2: Store i18nStore

Pour une approche plus flexible, utilisez le store :

```svelte
<script>
import { translation } from '../lib/stores/i18nStore';
</script>

<div>{$translation('navigation.contact')}</div>
```

Avec paramètres :

```svelte
<div>{$translation('footer.copyright', { year: new Date().getFullYear() })}</div>
```

#### Option 3: Fonction t

Pour les cas où vous avez besoin de manipuler des traductions dans la logique d'un composant :

```svelte
<script>
import { t } from '../lib/utils/i18n';
let message = t('hero.cta');
</script>
```

### Changer la langue

Pour changer la langue de l'application, utilisez la fonction `setLang` du store :

```svelte
<script>
import { setLang } from '../lib/stores/i18nStore';

function changeLang(lang) {
  setLang(lang); // 'fr' ou 'en'
}
</script>

<button on:click={() => changeLang('en')}>English</button>
<button on:click={() => changeLang('fr')}>Français</button>
```

## Ajouter une nouvelle langue

1. Créez un nouveau fichier JSON dans le dossier `i18n` (par exemple `es.json` pour l'espagnol)
2. Copiez la structure de `en.json` ou `fr.json` et traduisez toutes les chaînes
3. Mettez à jour la configuration dans `astro.config.mjs` pour inclure la nouvelle langue
4. Mettez à jour le type `Lang` dans `src/types/index.ts`

## Structure des clés de traduction

Les traductions sont organisées hiérarchiquement par section :

- `global` - Éléments globaux comme le nom du site
- `navigation` - Éléments de navigation
- `hero` - Section principale de la page d'accueil
- `features` - Section des fonctionnalités
- `footer` - Pied de page

## Bonnes pratiques

1. Toujours utiliser des clés de traduction et jamais des chaînes en dur
2. Structurer les clés de manière logique et cohérente
3. Utiliser des paramètres pour les valeurs variables (dates, nombres, noms)
4. Maintenir la synchronisation entre les différents fichiers de langue
5. Tester le site dans toutes les langues supportées 