#!/bin/bash

echo "🔨 Construction du frontend Angular..."

# Vérification de Node.js et npm
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérification de la version d'Angular CLI
if ! command -v ng &> /dev/null; then
    echo "📦 Installation d'Angular CLI..."
    npm install -g @angular/cli
fi

# Installation des dépendances
echo "📦 Installation des dépendances..."
npm install

# Construction
echo "🔨 Construction de l'application..."
npm run build:prod

# Vérification de la construction
if [ -d "dist/tp-app" ]; then
    echo "✅ Construction réussie !"
    echo "📁 Dossier de build créé: dist/tp-app"
    echo "📏 Taille: $(du -sh dist/tp-app | cut -f1)"
else
    echo "❌ Échec de la construction. Vérifiez les erreurs ci-dessus."
    exit 1
fi

echo ""
echo "🚀 Pour démarrer en mode développement: npm start"
echo "🐳 Pour construire l'image Docker: docker build -t tp-frontend ."
