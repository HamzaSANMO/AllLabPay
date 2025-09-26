#!/bin/bash

echo "🚀 Démarrage du backend LabPay..."

cd backend

# Vérifier si Java est installé
if ! command -v java &> /dev/null; then
    echo "❌ Java n'est pas installé. Veuillez installer Java 17 ou supérieur."
    exit 1
fi

# Vérifier la version de Java
JAVA_VERSION=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}')
echo "📋 Version Java détectée: $JAVA_VERSION"

# Démarrer l'application Spring Boot
echo "🔧 Démarrage de l'application Spring Boot..."
./mvnw spring-boot:run

echo "✅ Backend démarré sur http://localhost:8080"
echo "📊 Console H2: http://localhost:8080/h2-console"
echo "🔑 Comptes de test:"
echo "   - Étudiant: student@labpay.com / password123"
echo "   - Enseignant: teacher@labpay.com / password123"
echo "   - Admin: admin@labpay.com / password123"