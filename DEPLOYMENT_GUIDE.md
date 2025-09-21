# 🚀 Guide de Déploiement - TP Management Application

## 📋 Résumé des Corrections Effectuées

### ✅ Problèmes Corrigés

1. **Entité Payment** : Suppression de la duplication de la colonne `registration_id`
2. **Entité TP** : Déplacement de l'enum `TPStatus` dans un fichier séparé
3. **Entité Filiere** : Déplacement de l'enum `FiliereCode` dans un fichier séparé
4. **Entité Niveau** : Déplacement de l'enum `NiveauCode` dans un fichier séparé
5. **Service TpService** : Correction des incompatibilités avec l'entité TP
6. **Repository TPRepository** : Ajout des méthodes manquantes
7. **Dépendances** : Ajout de Spring Boot Actuator et Prometheus
8. **Frontend** : Mise à jour des versions Angular et dépendances
9. **Configuration** : Correction des noms de fichiers JAR et dossiers de build

### 🆕 Nouvelles Fonctionnalités Ajoutées

1. **Dockerisation complète** avec Dockerfiles optimisés
2. **Docker Compose** pour le développement et la production
3. **Monitoring** avec Prometheus, Grafana et Alertmanager
4. **CI/CD** avec GitHub Actions
5. **Scripts de déploiement** pour Windows et Linux
6. **Configuration SSL** pour la production
7. **Base de données** avec données d'initialisation
8. **Documentation complète** et guides d'utilisation

## 🐳 Déploiement avec Docker

### Prérequis
- Docker Desktop installé et démarré
- Docker Compose disponible

### Démarrage Rapide

#### 1. Développement Local
```bash
# Windows
dev.bat

# Linux/Mac
chmod +x dev.sh
./dev.sh
```

#### 2. Production
```bash
# Windows
deploy-prod.bat

# Linux/Mac
chmod +x deploy-prod.sh
./deploy-prod.sh
```

#### 3. Monitoring Standalone
```bash
# Windows
start-monitoring.bat

# Linux/Mac
docker-compose -f docker-compose.monitoring.yml up -d
```

## 🔧 Configuration des Variables d'Environnement

Créez un fichier `.env` à la racine du projet :

```bash
DB_PASSWORD=your_secure_password
JWT_SECRET=your_very_long_secure_jwt_secret
```

## 📊 Services Disponibles

| Service | Port | URL | Description |
|---------|------|-----|-------------|
| Frontend | 80 | http://localhost | Application Angular |
| Backend | 8080 | http://localhost:8080 | API Spring Boot |
| Base de données | 3306 | localhost:3306 | MySQL |
| Prometheus | 9090 | http://localhost:9090 | Monitoring |
| Grafana | 3000 | http://localhost:3000 | Dashboards |
| Alertmanager | 9093 | http://localhost:9093 | Alertes |

## 🚀 Déploiement en Production

### 1. Configuration SSL avec Let's Encrypt

```bash
# Installation de Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obtention du certificat
sudo certbot --nginx -d tp-app.yourdomain.com
```

### 2. Configuration Nginx

Le fichier `nginx-prod.conf` est déjà configuré pour la production avec SSL.

### 3. Déploiement

```bash
# Déploiement complet
docker-compose -f docker-compose.prod.yml up -d

# Avec monitoring
docker-compose -f docker-compose.prod.yml -f docker-compose.monitoring.yml up -d
```

## 🔄 CI/CD avec GitHub Actions

### Secrets Requis

Configurez ces secrets dans votre repository GitHub :

- `DOCKER_USERNAME` : Nom d'utilisateur Docker Hub
- `DOCKER_PASSWORD` : Mot de passe Docker Hub
- `SSH_PRIVATE_KEY` : Clé SSH pour le VPS
- `VPS_HOST` : Adresse IP du VPS
- `VPS_USER` : Utilisateur SSH du VPS

### Pipeline Automatique

1. **Build et Tests** : Compilation et tests automatiques
2. **Construction Docker** : Images Docker automatiques
3. **Déploiement** : Déploiement automatique sur VPS

## 📁 Structure des Fichiers

```
tp-management-app/
├── backend/                    # Application Spring Boot
│   ├── Dockerfile             # Image Docker backend
│   └── pom.xml                # Configuration Maven
├── frontend/                   # Application Angular
│   ├── Dockerfile             # Image Docker frontend
│   ├── nginx.conf             # Configuration Nginx
│   └── package.json           # Dépendances Node.js
├── docker-compose.yml          # Développement
├── docker-compose.prod.yml     # Production
├── docker-compose.dev.yml      # Développement local
├── docker-compose.monitoring.yml # Monitoring standalone
├── prometheus.yml              # Configuration Prometheus
├── rules.yml                   # Règles d'alerte
├── alertmanager.yml            # Configuration Alertmanager
├── nginx-prod.conf             # Nginx production SSL
├── init.sql                    # Initialisation base de données
├── deploy.sh                   # Script déploiement Linux
├── deploy.bat                  # Script déploiement Windows
├── dev.sh                      # Script développement Linux
├── dev.bat                     # Script développement Windows
├── deploy-prod.sh              # Script production Linux
├── deploy-prod.bat             # Script production Windows
├── start-monitoring.bat        # Script monitoring Windows
├── .github/workflows/          # GitHub Actions
└── environment.env             # Variables d'environnement
```

## 🧪 Tests et Vérification

### Backend
```bash
cd backend
mvn test
```

### Frontend
```bash
cd frontend
npm test
npm run e2e
```

### Vérification des Services
```bash
# Windows
status.bat

# Linux/Mac
chmod +x status.sh
./status.sh
```

## 🔒 Sécurité

- **Authentification JWT** avec clés sécurisées
- **Validation des entrées** avec Bean Validation
- **CORS configuré** pour la production
- **Headers de sécurité** avec Content Security Policy
- **Audit logging** pour toutes les actions
- **Monitoring** des performances et erreurs

## 📝 API Documentation

- **Swagger UI** : http://localhost:8080/api/swagger-ui.html
- **OpenAPI JSON** : http://localhost:8080/api/v3/api-docs

## 🐛 Dépannage

### Logs
```bash
# Tous les services
docker-compose logs -f

# Service spécifique
docker-compose logs -f backend
```

### Redémarrage
```bash
# Redémarrer un service
docker-compose restart backend

# Redémarrer tous les services
docker-compose restart
```

### Nettoyage
```bash
# Arrêter et supprimer les conteneurs
docker-compose down

# Supprimer aussi les volumes
docker-compose down -v
```

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Consulter la documentation dans le README.md
- Vérifier les logs des services

---

**⚠️ Important** : Assurez-vous de remplacer toutes les valeurs par défaut (mots de passe, secrets, domaines) par des valeurs sécurisées avant le déploiement en production.

**🎯 Objectif** : Cette application est maintenant prête pour le déploiement en production avec un monitoring complet et une CI/CD automatisée.
