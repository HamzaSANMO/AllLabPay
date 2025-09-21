@echo off
echo 📊 Démarrage du monitoring standalone...

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

REM Démarrage des services de monitoring
echo 🚀 Démarrage des services de monitoring...
docker-compose -f docker-compose.monitoring.yml up -d

REM Attente du démarrage
echo ⏳ Attente du démarrage des services...
timeout /t 30 /nobreak >nul

REM Vérification de l'état des services
echo 🔍 Vérification de l'état des services...
docker-compose -f docker-compose.monitoring.yml ps

echo ✅ Monitoring démarré !
echo 📊 Prometheus accessible sur: http://localhost:9090
echo 📈 Grafana accessible sur: http://localhost:3000
echo 🚨 Alertmanager accessible sur: http://localhost:9093
echo.
echo 📊 Pour voir les logs: docker-compose -f docker-compose.monitoring.yml logs -f
echo 🛑 Pour arrêter: docker-compose -f docker-compose.monitoring.yml down
echo.
echo 🔧 Comptes par défaut Grafana:
echo    Username: admin
echo    Password: admin

pause
