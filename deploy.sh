#!/bin/bash

echo "🚀 Démarrage du déploiement de l'application TP Management..."

# Vérification de Docker et Docker Compose
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Construction et démarrage des services
echo "🔨 Construction des images Docker..."
docker-compose build

echo "🚀 Démarrage des services..."
docker-compose up -d

echo "⏳ Attente du démarrage des services..."
sleep 30

# Vérification de l'état des services
echo "🔍 Vérification de l'état des services..."
docker-compose ps

echo "✅ Déploiement terminé !"
echo "🌐 Frontend accessible sur: http://localhost"
echo "🔧 Backend accessible sur: http://localhost:8080"
echo "🗄️  Base de données MySQL accessible sur: localhost:3306"
echo ""
echo "📊 Pour voir les logs: docker-compose logs -f"
echo "🛑 Pour arrêter: docker-compose down"
