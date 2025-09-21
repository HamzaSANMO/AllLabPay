@echo off
echo 🚀 Déploiement en production de l'application TP Management...

REM Vérification des variables d'environnement
if "%DB_PASSWORD%"=="" (
    echo ❌ Variable DB_PASSWORD non définie
    pause
    exit /b 1
)

if "%JWT_SECRET%"=="" (
    echo ❌ Variable JWT_SECRET non définie
    pause
    exit /b 1
)

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

REM Arrêt des services existants
echo 🛑 Arrêt des services existants...
docker-compose -f docker-compose.prod.yml down

REM Nettoyage des images obsolètes
echo 🧹 Nettoyage des images obsolètes...
docker system prune -f

REM Construction et démarrage des services de production
echo 🔨 Construction des images Docker pour la production...
docker-compose -f docker-compose.prod.yml build --no-cache

echo 🚀 Démarrage des services de production...
docker-compose -f docker-compose.prod.yml up -d

REM Attente du démarrage
echo ⏳ Attente du démarrage des services...
timeout /t 60 /nobreak >nul

REM Vérification de l'état des services
echo 🔍 Vérification de l'état des services...
docker-compose -f docker-compose.prod.yml ps

echo ✅ Déploiement en production terminé !
echo 🌐 Frontend accessible sur: http://localhost
echo 🔧 Backend accessible sur: http://localhost:8080
echo 🗄️  Base de données MySQL accessible sur: localhost:3306
echo 📊 Prometheus accessible sur: http://localhost:9090
echo 📈 Grafana accessible sur: http://localhost:3000
echo.
echo 📊 Pour voir les logs: docker-compose -f docker-compose.prod.yml logs -f
echo 🛑 Pour arrêter: docker-compose -f docker-compose.prod.yml down

pause
