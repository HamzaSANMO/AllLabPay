#!/bin/bash

echo "🚀 Démarrage du frontend LabPay..."

cd frontend

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez installer Node.js 18 ou supérieur."
    exit 1
fi

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé. Veuillez installer npm."
    exit 1
fi

# Vérifier la version de Node.js
NODE_VERSION=$(node -v)
echo "📋 Version Node.js détectée: $NODE_VERSION"

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Démarrer l'application Angular
echo "🔧 Démarrage de l'application Angular..."
npm start

echo "✅ Frontend démarré sur http://localhost:4200"