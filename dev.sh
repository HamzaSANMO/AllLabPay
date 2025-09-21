#!/bin/bash

echo "🚀 Démarrage de l'environnement de développement..."

# Vérification de Docker et Docker Compose
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Construction et démarrage des services de développement
echo "🔨 Construction des images Docker pour le développement..."
docker-compose -f docker-compose.dev.yml build

echo "🚀 Démarrage des services de développement..."
docker-compose -f docker-compose.dev.yml up -d

echo "⏳ Attente du démarrage des services..."
sleep 30

# Vérification de l'état des services
echo "🔍 Vérification de l'état des services..."
docker-compose -f docker-compose.dev.yml ps

echo "✅ Environnement de développement démarré !"
echo "🌐 Frontend accessible sur: http://localhost:4200"
echo "🔧 Backend accessible sur: http://localhost:8080"
echo "🗄️  Base de données MySQL accessible sur: localhost:3306"
echo "📊 phpMyAdmin accessible sur: http://localhost:8081"
echo ""
echo "📊 Pour voir les logs: docker-compose -f docker-compose.dev.yml logs -f"
echo "🛑 Pour arrêter: docker-compose -f docker-compose.dev.yml down"
echo ""
echo "🔧 Comptes par défaut:"
echo "   Admin: admin@tp-management.com / admin123"
echo "   Teacher: teacher@tp-management.com / admin123"
echo "   Student: student@tp-management.com / admin123"
