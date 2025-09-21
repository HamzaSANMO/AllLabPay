#!/bin/bash

echo "🔨 Construction du backend Spring Boot..."

# Vérification de Maven
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Nettoyage et construction
echo "🧹 Nettoyage du projet..."
mvn clean

echo "📦 Construction du package..."
mvn package -DskipTests

# Vérification de la construction
if [ -f "target/tp-management.jar" ]; then
    echo "✅ Construction réussie !"
    echo "📁 Fichier JAR créé: target/tp-management.jar"
    echo "📏 Taille: $(du -h target/tp-management.jar | cut -f1)"
else
    echo "❌ Échec de la construction. Vérifiez les erreurs ci-dessus."
    exit 1
fi

echo ""
echo "🚀 Pour démarrer l'application: java -jar target/tp-management.jar"
echo "🐳 Pour construire l'image Docker: docker build -t tp-backend ."
