#!/bin/bash

echo "🔄 Redémarrage de l'application TP Management..."

# Arrêt des services
echo "🛑 Arrêt des services..."
docker-compose down

# Nettoyage des images (optionnel)
if [ "$1" = "--clean" ]; then
    echo "🧹 Nettoyage des images Docker..."
    docker-compose down --rmi all --volumes --remove-orphans
    docker system prune -f
fi

# Redémarrage des services
echo "🚀 Redémarrage des services..."
docker-compose up -d

# Attente du démarrage
echo "⏳ Attente du démarrage des services..."
sleep 30

# Vérification de l'état
echo "🔍 Vérification de l'état des services..."
docker-compose ps

echo "✅ Redémarrage terminé !"
echo "🌐 Frontend accessible sur: http://localhost"
echo "🔧 Backend accessible sur: http://localhost:8080"
echo ""
echo "📊 Pour voir les logs: docker-compose logs -f"
