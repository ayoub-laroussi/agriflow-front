FROM node:20-alpine

WORKDIR /app

# Installation des dépendances système nécessaires
RUN apk add --no-cache python3 make g++ curl

# Installation de wrangler globalement
RUN npm install -g wrangler

# Copie des fichiers de configuration
COPY package.json ./

# Installation des dépendances
RUN npm i

# Copie des fichiers sources
COPY . .

# Exposition du port de développement
EXPOSE 4321

# Commande pour démarrer le serveur de développement
CMD ["npm", "run", "dev"] 