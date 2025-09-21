@echo off
echo 🚀 Démarrage du déploiement de l'application TP Management...

REM Vérification de Docker et Docker Compose
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker n'est pas installé. Veuillez l'installer d'abord.
    pause
    exit /b 1
)

docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Compose n'est pas installé. Veuillez l'installer d'abord.
    pause
    exit /b 1
)

REM Construction et démarrage des services
echo 🔨 Construction des images Docker...
docker-compose build

echo 🚀 Démarrage des services...
docker-compose up -d

echo ⏳ Attente du démarrage des services...
timeout /t 30 /nobreak >nul

REM Vérification de l'état des services
echo 🔍 Vérification de l'état des services...
docker-compose ps

echo ✅ Déploiement terminé !
echo 🌐 Frontend accessible sur: http://localhost
echo 🔧 Backend accessible sur: http://localhost:8080
echo 🗄️  Base de données MySQL accessible sur: localhost:3306
echo.
echo 📊 Pour voir les logs: docker-compose logs -f
echo 🛑 Pour arrêter: docker-compose down

pause
