# LabPay Application

Application mobile-first pour la gestion des paiements de laboratoire avec navigation en bas.

## Architecture

- **Frontend**: Angular + Tailwind CSS
- **Backend**: Spring Boot
- **Workflows**: STUDENT/TEACHER/ADMIN

## Structure du projet

```
labpay/
├── frontend/          # Application Angular
├── backend/           # API Spring Boot
└── README.md
```

## Installation

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

## Fonctionnalités

- Navigation mobile-first avec barre en bas
- Gestion des utilisateurs (STUDENT/TEACHER/ADMIN)
- Interface responsive avec Tailwind CSS
- API REST avec Spring Boot