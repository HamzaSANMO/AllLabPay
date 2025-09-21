-- Initialisation de la base de données TP Management

-- Création de la base de données
CREATE DATABASE IF NOT EXISTS tp_management;
USE tp_management;

-- Insertion des rôles
INSERT INTO roles (name) VALUES 
('STUDENT'),
('TEACHER'),
('ADMIN')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Insertion des départements
INSERT INTO departements (nom, numero_mtn, numero_moov, numero_celtiis) VALUES 
('Informatique', '+225 0701234567', '+225 0101234567', '+225 0501234567'),
('Mathématiques', '+225 0701234568', '+225 0101234568', '+225 0501234568'),
('Physique', '+225 0701234569', '+225 0101234569', '+225 0501234569')
ON DUPLICATE KEY UPDATE nom = VALUES(nom);

-- Insertion des filières
INSERT INTO filieres (code, nom) VALUES 
('SVT', 'Sciences de la Vie et de la Terre'),
('PC', 'Physique-Chimie'),
('MIA', 'Mathématiques-Informatique-Applications')
ON DUPLICATE KEY UPDATE nom = VALUES(nom);

-- Insertion des niveaux
INSERT INTO niveaux (code, nom) VALUES 
('L1', 'Licence 1'),
('L2', 'Licence 2'),
('L3', 'Licence 3')
ON DUPLICATE KEY UPDATE nom = VALUES(nom);

-- Insertion des matières
INSERT INTO matieres (nom, code, filiere_id, niveau_id) VALUES 
('Programmation Java', 'JAVA', 1, 1),
('Base de données', 'BDD', 1, 2),
('Algorithmes', 'ALGO', 1, 1),
('Calcul différentiel', 'CALC', 2, 1),
('Mécanique', 'MECA', 3, 1)
ON DUPLICATE KEY UPDATE nom = VALUES(nom);

-- Insertion d'un utilisateur admin par défaut
-- Mot de passe: admin123 (à changer en production)
INSERT INTO users (email, password_hash, role, is_active, created_at) VALUES 
('admin@tp-management.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'ADMIN', true, NOW())
ON DUPLICATE KEY UPDATE email = VALUES(email);

-- Insertion d'un enseignant par défaut
INSERT INTO users (email, password_hash, role, is_active, created_at) VALUES 
('teacher@tp-management.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'TEACHER', true, NOW())
ON DUPLICATE KEY UPDATE email = VALUES(email);

-- Insertion d'un étudiant par défaut
INSERT INTO users (email, password_hash, matricule, role, is_active, created_at) VALUES 
('student@tp-management.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'STU001', 'STUDENT', true, NOW())
ON DUPLICATE KEY UPDATE email = VALUES(email);

-- Création du profil enseignant
INSERT INTO teacher_profiles (user_id, departement, created_by_admin_id, created_at) VALUES 
(2, 'Informatique', 1, NOW())
ON DUPLICATE KEY UPDATE departement = VALUES(departement);

-- Insertion de quelques TP d'exemple
INSERT INTO tps (titre, description, prix, capacite, date_debut, date_fin, matiere_id, enseignant_id, status) VALUES 
('TP Programmation Java', 'Travaux pratiques sur la programmation orientée objet en Java', 5000.0, 30, '2024-02-01', '2024-02-28', 1, 2, 'PUBLISHED'),
('TP Base de données', 'Travaux pratiques sur la conception et l''implémentation de bases de données', 4000.0, 25, '2024-02-15', '2024-03-15', 2, 2, 'PUBLISHED'),
('TP Algorithmes', 'Travaux pratiques sur les structures de données et algorithmes', 3500.0, 20, '2024-03-01', '2024-03-31', 3, 2, 'DRAFT')
ON DUPLICATE KEY UPDATE titre = VALUES(titre);

-- Insertion d'inscriptions d'exemple
INSERT INTO tp_registrations (tp_id, student_id, registration_date, status) VALUES 
(1, 3, NOW(), 'CONFIRMED'),
(2, 3, NOW(), 'PENDING')
ON DUPLICATE KEY UPDATE status = VALUES(status);

-- Insertion de paiements d'exemple
INSERT INTO payments (registration_id, amount, provider, reference, status, created_at) VALUES 
(1, 5000.0, 'MTN', 'PAY001', 'PAID', NOW()),
(2, 4000.0, 'MOOV', 'PAY002', 'PENDING', NOW())
ON DUPLICATE KEY UPDATE status = VALUES(status);

-- Insertion de notes d'exemple
INSERT INTO grades (registration_id, score, max_score, feedback, graded_by, graded_at, is_final) VALUES 
(1, 85.0, 100.0, 'Excellent travail, bonne compréhension des concepts', 2, NOW(), true)
ON DUPLICATE KEY UPDATE score = VALUES(score);

-- Insertion de logs d'audit
INSERT INTO audit_logs (actor_id, action, entity, entity_id, created_at) VALUES 
(1, 'CREATE', 'TP', 1, NOW()),
(1, 'CREATE', 'TP', 2, NOW()),
(1, 'CREATE', 'TP', 3, NOW()),
(3, 'REGISTER', 'TP_REGISTRATION', 1, NOW()),
(3, 'REGISTER', 'TP_REGISTRATION', 2, NOW())
ON DUPLICATE KEY UPDATE action = VALUES(action);

COMMIT;
