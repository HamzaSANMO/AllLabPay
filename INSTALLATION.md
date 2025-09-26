# Guide d'installation LabPay

## Prérequis

### Backend (Spring Boot)
- **Java 17** ou supérieur
- **Maven** (inclus avec le wrapper)

### Frontend (Angular)
- **Node.js 18** ou supérieur
- **npm** (inclus avec Node.js)

## Installation rapide

### 1. Cloner le projet
```bash
cd /home/test/labpay
```

### 2. Démarrage automatique (recommandé)
```bash
chmod +x start-all.sh
./start-all.sh
```

### 3. Démarrage manuel

#### Backend
```bash
chmod +x start-backend.sh
./start-backend.sh
```

#### Frontend (dans un autre terminal)
```bash
chmod +x start-frontend.sh
./start-frontend.sh
```

## Accès aux services

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:8080/api
- **Console H2**: http://localhost:8080/h2-console
  - URL: `jdbc:h2:mem:labpay`
  - Username: `sa`
  - Password: `password`

## Comptes de test

| Rôle | Email | Mot de passe | ID Étudiant |
|------|-------|--------------|-------------|
| Étudiant | student@labpay.com | password123 | 2024001 |
| Enseignant | teacher@labpay.com | password123 | - |
| Administrateur | admin@labpay.com | password123 | - |

## Fonctionnalités par rôle

### Étudiant (STUDENT)
- ✅ Consulter ses paiements
- ✅ Voir le statut des paiements
- ❌ Créer des paiements

### Enseignant (TEACHER)
- ✅ Consulter tous les paiements
- ✅ Créer de nouveaux paiements
- ✅ Modifier le statut des paiements
- ❌ Supprimer des paiements

### Administrateur (ADMIN)
- ✅ Toutes les fonctionnalités
- ✅ Gestion complète des utilisateurs
- ✅ Statistiques globales

## Architecture

```
labpay/
├── frontend/                 # Application Angular
│   ├── src/app/
│   │   ├── components/       # Composants réutilisables
│   │   ├── pages/           # Pages principales
│   │   ├── services/        # Services API
│   │   └── guards/         # Guards d'authentification
│   └── tailwind.config.js   # Configuration Tailwind
├── backend/                 # API Spring Boot
│   ├── src/main/java/com/labpay/
│   │   ├── controller/      # Contrôleurs REST
│   │   ├── service/        # Services métier
│   │   ├── repository/     # Repositories JPA
│   │   ├── model/          # Entités JPA
│   │   └── config/         # Configuration
│   └── pom.xml             # Dépendances Maven
└── start-*.sh              # Scripts de démarrage
```

## Technologies utilisées

### Frontend
- **Angular 17** - Framework frontend
- **Tailwind CSS** - Framework CSS
- **RxJS** - Programmation réactive
- **TypeScript** - Langage de programmation

### Backend
- **Spring Boot 3.2** - Framework backend
- **Spring Security** - Authentification et autorisation
- **Spring Data JPA** - Persistance des données
- **H2 Database** - Base de données en mémoire
- **JWT** - Tokens d'authentification
- **Maven** - Gestion des dépendances

## Développement

### Structure des API

#### Authentification
- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription

#### Paiements
- `GET /api/payments` - Liste des paiements
- `POST /api/payments` - Créer un paiement
- `GET /api/payments/{id}` - Détails d'un paiement
- `PATCH /api/payments/{id}/status` - Modifier le statut
- `DELETE /api/payments/{id}` - Supprimer un paiement

#### Utilisateurs
- `GET /api/users` - Liste des utilisateurs
- `GET /api/users/{id}` - Détails d'un utilisateur

### Personnalisation

#### Couleurs Tailwind
Modifier `frontend/tailwind.config.js` pour personnaliser les couleurs :

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Vos couleurs personnalisées
      }
    }
  }
}
```

#### Configuration backend
Modifier `backend/src/main/resources/application.yml` pour :
- Changer le port
- Configurer une vraie base de données
- Modifier les paramètres JWT

## Dépannage

### Problèmes courants

1. **Port déjà utilisé**
   - Backend: Modifier `server.port` dans `application.yml`
   - Frontend: Utiliser `npm start -- --port 4201`

2. **Erreurs CORS**
   - Vérifier la configuration dans `SecurityConfig.java`

3. **Problèmes de dépendances**
   - Backend: `./mvnw clean install`
   - Frontend: `rm -rf node_modules && npm install`

### Logs
- Backend: Consulter la console de démarrage
- Frontend: Consulter la console du navigateur (F12)

## Support

Pour toute question ou problème :
1. Vérifier les logs d'erreur
2. Consulter la documentation des technologies utilisées
3. Vérifier la configuration des ports et CORS