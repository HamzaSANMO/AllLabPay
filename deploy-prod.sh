#!/bin/bash

echo "🚀 Déploiement en production de l'application TP Management..."

# Vérification des variables d'environnement
if [ -z "$DB_PASSWORD" ]; then
    echo "❌ Variable DB_PASSWORD non définie"
    exit 1
fi

if [ -z "$JWT_SECRET" ]; then
    echo "❌ Variable JWT_SECRET non définie"
    exit 1
fi

# Vérification de Docker et Docker Compose
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Arrêt des services existants
echo "🛑 Arrêt des services existants..."
docker-compose -f docker-compose.prod.yml down

# Nettoyage des images obsolètes
echo "🧹 Nettoyage des images obsolètes..."
docker system prune -f

# Construction et démarrage des services de production
echo "🔨 Construction des images Docker pour la production..."
docker-compose -f docker-compose.prod.yml build --no-cache

echo "🚀 Démarrage des services de production..."
docker-compose -f docker-compose.prod.yml up -d

# Attente du démarrage
echo "⏳ Attente du démarrage des services..."
sleep 60

# Vérification de l'état des services
echo "🔍 Vérification de l'état des services..."
docker-compose -f docker-compose.prod.yml ps

# Vérification de la santé de l'application
echo "🏥 Vérification de la santé de l'application..."
if curl -f http://localhost:8080/api/actuator/health > /dev/null 2>&1; then
    echo "✅ Application en bonne santé"
else
    echo "❌ Problème avec l'application"
    docker-compose -f docker-compose.prod.yml logs backend
    exit 1
fi

echo "✅ Déploiement en production terminé !"
echo "🌐 Frontend accessible sur: http://localhost"
echo "🔧 Backend accessible sur: http://localhost:8080"
echo "🗄️  Base de données MySQL accessible sur: localhost:3306"
echo "📊 Prometheus accessible sur: http://localhost:9090"
echo "📈 Grafana accessible sur: http://localhost:3000"
echo ""
echo "📊 Pour voir les logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "🛑 Pour arrêter: docker-compose -f docker-compose.prod.yml down"
