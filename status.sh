#!/bin/bash

echo "🔍 Vérification de l'état de l'application TP Management..."
echo ""

# État des conteneurs Docker
echo "🐳 État des conteneurs Docker:"
docker-compose ps
echo ""

# Utilisation des ressources
echo "💾 Utilisation des ressources:"
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"
echo ""

# Logs récents
echo "📝 Logs récents du backend:"
docker-compose logs --tail=10 backend
echo ""

echo "📝 Logs récents du frontend:"
docker-compose logs --tail=10 frontend
echo ""

# Vérification des ports
echo "🔌 Vérification des ports:"
echo "Frontend (port 80): $(curl -s -o /dev/null -w "%{http_code}" http://localhost || echo "Non accessible")"
echo "Backend (port 8080): $(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/api/actuator/health || echo "Non accessible")"
echo ""

# Espace disque
echo "💿 Espace disque:"
df -h | grep -E "(Filesystem|/$)"
echo ""

echo "✅ Vérification terminée !"
