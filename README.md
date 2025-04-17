# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

# AgriFlow - Environnement de Développement

Ce README explique comment configurer et utiliser l'environnement de développement Docker pour AgriFlow.

## Prérequis

- [Docker](https://www.docker.com/get-started) (version 20.10.0 ou supérieure)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0.0 ou supérieure)

## Configuration de l'environnement de développement

### Première installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-organisation/agriflow-front.git
   cd agriflow-front
   ```

2. Démarrez l'environnement de développement avec Docker Compose :
   ```bash
   docker-compose up -d
   ```

3. L'application frontend sera accessible à l'adresse suivante :
   ```
   http://localhost:4321
   ```

### Commandes utiles

- **Démarrer les services** :
  ```bash
  docker-compose up -d
  ```

- **Arrêter les services** :
  ```bash
  docker-compose down
  ```

- **Voir les logs** :
  ```bash
  docker-compose logs -f frontend
  ```

- **Reconstruire les images** (après modification du Dockerfile) :
  ```bash
  docker-compose build
  ```

- **Exécuter des commandes dans le conteneur** :
  ```bash
  docker-compose exec frontend sh
  ```

- **Installation de nouvelles dépendances** :
  ```bash
  docker-compose exec frontend pnpm add <package-name>
  ```

## Structure des fichiers Docker

- `Dockerfile` : Configuration de l'image Docker pour le frontend
- `docker-compose.yml` : Configuration des services (frontend, et plus tard backend et base de données)
- `.dockerignore` : Fichiers à ignorer lors du build de l'image Docker

## Développement

Le répertoire local est monté dans le conteneur Docker, ce qui signifie que les modifications apportées aux fichiers source sont automatiquement détectées et le serveur de développement Astro recharge l'application.

## Dépannage

- **Problèmes de permissions** : Si vous rencontrez des problèmes de permissions avec les fichiers générés par Docker, essayez d'exécuter :
  ```bash
  sudo chown -R $(id -u):$(id -g) .
  ```

- **Ports déjà utilisés** : Si les ports 4321 ou 3000 sont déjà utilisés sur votre machine, modifiez les mappings de ports dans le fichier `docker-compose.yml`.

- **Hot reload ne fonctionne pas** : Assurez-vous que `CHOKIDAR_USEPOLLING=true` est défini dans les variables d'environnement du service frontend dans `docker-compose.yml`.

## Future expansion

Le fichier `docker-compose.yml` contient des sections commentées pour le backend et la base de données. Ces sections peuvent être décommentées et configurées lorsque ces composants seront développés.
