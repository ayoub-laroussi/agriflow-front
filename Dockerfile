FROM node:18-slim

WORKDIR /app

# Désactiver les modules natifs de Rollup qui causent des problèmes
ENV ROLLUP_SKIP_NATIVE=true

# Copie des fichiers de configuration
COPY package.json package-lock.json ./

# Installation des dépendances
RUN npm ci

# Copie des fichiers sources
COPY . .

# Exposition du port de développement
EXPOSE 4321

# Commande pour démarrer le serveur de développement
CMD ["npm", "run", "dev", "--", "--host"] 