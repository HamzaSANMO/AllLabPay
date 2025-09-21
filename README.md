# TP Management Application

Application de gestion des travaux pratiques (TP) avec authentification, gestion des utilisateurs, et système de paiement.

## 🏗️ Architecture

- **Backend**: Spring Boot 3.2.0 avec Java 17
- **Frontend**: Angular 16
- **Base de données**: MySQL 8.0
- **Containerisation**: Docker & Docker Compose
- **Monitoring**: Prometheus + Grafana
- **CI/CD**: GitHub Actions

## 🚀 Démarrage rapide

### Prérequis

- Docker et Docker Compose
- Java 17 (pour le développement local)
- Node.js 18+ (pour le développement local)
- Maven 3.6+

### Déploiement avec Docker

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd tp-management-app
   ```

2. **Configurer les variables d'environnement**
   ```bash
   cp environment.env .env
   # Éditer .env avec vos valeurs
   ```

3. **Démarrer l'application**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

4. **Accéder à l'application**
   - Frontend: http://localhost
   - Backend: http://localhost:8080
   - Base de données: localhost:3306

## 🔧 Développement local

### Backend

```bash
cd backend
chmod +x build-backend.sh
./build-backend.sh
```

### Frontend

```bash
cd frontend
chmod +x build-frontend.sh
./build-frontend.sh
```

## 🐳 Docker

### Construction des images

```bash
# Backend
docker build -t tp-backend ./backend

# Frontend
docker build -t tp-frontend ./frontend
```

### Services disponibles

- **backend**: Port 8080 (Spring Boot)
- **frontend**: Port 80 (Nginx + Angular)
- **db**: Port 3306 (MySQL)
- **prometheus**: Port 9090 (Monitoring)
- **grafana**: Port 3000 (Dashboards)

## 📊 Monitoring

### Actuator Endpoints

- Health: `/api/actuator/health`
- Metrics: `/api/actuator/metrics`
- Prometheus: `/api/actuator/prometheus`

### Prometheus + Grafana

```bash
# Démarrer avec monitoring
docker-compose -f docker-compose.prod.yml up -d

# Accéder à Prometheus: http://localhost:9090
# Accéder à Grafana: http://localhost:3000
```

## 🚀 Production

### Configuration SSL avec Let's Encrypt

1. **Configurer le domaine**
   ```bash
   # Remplacer tp-app.yourdomain.com dans nginx-prod.conf
   ```

2. **Obtenir le certificat SSL**
   ```bash
   sudo apt update
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d tp-app.yourdomain.com
   ```

3. **Déployer**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Variables d'environnement

```bash
DB_PASSWORD=your_secure_password
JWT_SECRET=your_very_long_secure_jwt_secret
```

## 🔄 CI/CD

### GitHub Actions

Le pipeline automatique :
1. Build et tests du backend (Maven)
2. Build et tests du frontend (Angular)
3. Construction des images Docker
4. Déploiement sur VPS

### Secrets requis

- `DOCKER_USERNAME`: Nom d'utilisateur Docker Hub
- `DOCKER_PASSWORD`: Mot de passe Docker Hub
- `SSH_PRIVATE_KEY`: Clé SSH pour le VPS
- `VPS_HOST`: Adresse IP du VPS
- `VPS_USER`: Utilisateur SSH du VPS

## 📁 Structure du projet

```
tp-management-app/
├── backend/                 # Application Spring Boot
│   ├── src/
│   ├── Dockerfile
│   └── pom.xml
├── frontend/               # Application Angular
│   ├── src/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docker-compose.yml      # Configuration Docker Compose
├── docker-compose.prod.yml # Configuration production
├── deploy.sh              # Script de déploiement
├── build-backend.sh       # Script build backend
├── build-frontend.sh      # Script build frontend
├── prometheus.yml         # Configuration Prometheus
├── nginx-prod.conf        # Configuration Nginx production
└── .github/workflows/     # GitHub Actions
```

## 🧪 Tests

### Backend

```bash
cd backend
mvn test
```

### Frontend

```bash
cd frontend
npm test
```

### E2E

```bash
cd frontend
npm run e2e
```

## 🔒 Sécurité

- Authentification JWT
- Validation des entrées
- CORS configuré
- Headers de sécurité
- Audit logging

## 📝 API Documentation

- Swagger UI: http://localhost:8080/api/swagger-ui.html
- OpenAPI JSON: http://localhost:8080/api/v3/api-docs

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

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commit les changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement

---

**Note**: Assurez-vous de remplacer toutes les valeurs par défaut (mots de passe, secrets, domaines) par des valeurs sécurisées avant le déploiement en production.# AllLabPay
