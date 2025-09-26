#!/bin/bash

echo "🚀 Démarrage complet de LabPay..."

# Fonction pour démarrer le backend en arrière-plan
start_backend() {
    echo "🔧 Démarrage du backend..."
    cd backend
    ./mvnw spring-boot:run &
    BACKEND_PID=$!
    echo "📋 Backend démarré avec PID: $BACKEND_PID"
    cd ..
}

# Fonction pour démarrer le frontend
start_frontend() {
    echo "⏳ Attente du démarrage du backend (30 secondes)..."
    sleep 30
    
    echo "🔧 Démarrage du frontend..."
    cd frontend
    
    # Installer les dépendances si nécessaire
    if [ ! -d "node_modules" ]; then
        echo "📦 Installation des dépendances..."
        npm install
    fi
    
    npm start
}

# Fonction de nettoyage
cleanup() {
    echo "🛑 Arrêt des services..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
    fi
    exit 0
}

# Capturer Ctrl+C pour nettoyer
trap cleanup SIGINT

# Démarrer le backend
start_backend

# Démarrer le frontend
start_frontend