package com.example.tpmanagement.config;

import com.example.tpmanagement.entity.*;
import com.example.tpmanagement.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final DepartementRepository departementRepository;
    private final FiliereRepository filiereRepository;
    private final NiveauRepository niveauRepository;
    private final MatiereRepository matiereRepository;

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            // Créer des données de base en premier
            initBasicData();

            // Créer l'admin par défaut
            initAdmin();

            // Créer des utilisateurs de test
            initTestUsers();
        };
    }

    private void initAdmin() {
        String adminEmail = "admin@admin.com";
        if (userRepository.findByEmail(adminEmail).isEmpty()) {
            User admin = new User();
            admin.setEmail(adminEmail);
            admin.setMatricule("ADMIN001");
            admin.setNom("Administrateur");
            admin.setPrenom("Système");
            admin.setPasswordHash(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);
            admin.setIsActive(true);
            admin.setDepartement("Informatique");

            userRepository.save(admin);
            System.out.println("✅ Admin par défaut créé: admin@admin.com / admin123");
        } else {
            System.out.println("ℹ️ Admin déjà présent, aucun besoin de le recréer");
        }
    }

    private void initBasicData() {
        // Créer des départements avec vérification d'existence
        if (departementRepository.count() == 0) {
            Departement info = new Departement();
            info.setNom("Informatique");
            departementRepository.save(info);

            Departement maths = new Departement();
            maths.setNom("Mathématiques");
            departementRepository.save(maths);

            System.out.println("✅ Départements créés");
        }

        // Créer des niveaux avec vérification d'existence
        if (niveauRepository.count() == 0) {
            Niveau l1 = new Niveau();
            l1.setNom("Licence 1");
            l1.setCode(NiveauCode.L1);
            niveauRepository.save(l1);

            Niveau l2 = new Niveau();
            l2.setNom("Licence 2");
            l2.setCode(NiveauCode.L2);
            niveauRepository.save(l2);

            Niveau l3 = new Niveau();
            l3.setNom("Licence 3");
            l3.setCode(NiveauCode.L3);
            niveauRepository.save(l3);

            System.out.println("✅ Niveaux créés");
        }

        // Créer des filières avec vérification d'existence
        if (filiereRepository.count() == 0) {
            Filiere info = new Filiere();
            info.setNom("Informatique");
            info.setCode(FiliereCode.SVT);
            filiereRepository.save(info);

            Filiere maths = new Filiere();
            maths.setNom("Mathématiques");
            maths.setCode(FiliereCode.PC);
            filiereRepository.save(maths);

            System.out.println("✅ Filières créées");
        }

        // Créer des matières avec vérification d'existence
        if (matiereRepository.count() == 0) {
            // Récupérer une filière et un niveau pour associer aux matières
            Filiere filiere = filiereRepository.findByCode(FiliereCode.SVT).orElseThrow(() -> new IllegalStateException("Filière SVT non trouvée"));
            Niveau niveau = niveauRepository.findByCode(NiveauCode.L1).orElseThrow(() -> new IllegalStateException("Niveau L1 non trouvé"));

            Matiere java = new Matiere();
            java.setNom("Programmation Java");
            java.setCode("JAVA");
            java.setFiliere(filiere); // Associer la filière
            java.setNiveau(niveau);   // Associer le niveau
            matiereRepository.save(java);

            Matiere web = new Matiere();
            web.setNom("Développement Web");
            web.setCode("WEB");
            web.setFiliere(filiere);  // Associer la filière
            web.setNiveau(niveau);    // Associer le niveau
            matiereRepository.save(web);

            System.out.println("✅ Matières créées");
        }
    }

    private void initTestUsers() {
        // Créer un enseignant de test - EXACTEMENT comme vous l'avez défini
        if (userRepository.findByEmail("teacher@teacher.com").isEmpty()) {
            User teacher = new User();
            teacher.setEmail("teacher@teacher.com");
            teacher.setMatricule("12345");
            teacher.setNom("teacher");
            teacher.setPrenom("teacher");
            teacher.setPasswordHash(passwordEncoder.encode("teacher123"));
            teacher.setRole(Role.TEACHER);
            teacher.setIsActive(true);
            teacher.setDepartement("Informatique");
            teacher.setGrade("Maître de Conférences");
            teacher.setCreatedByAdminId(1L); // ID de l'admin

            userRepository.save(teacher);
            System.out.println("✅ Enseignant de test créé: teacher@teacher.com / teacher123");
        }

        // Créer un étudiant de test - EXACTEMENT comme vous l'avez défini
        if (userRepository.findByEmail("student@student.com").isEmpty()) {
            User student = new User();
            student.setEmail("student@student.com");
            student.setMatricule("123456");
            student.setNom("student");
            student.setPrenom("student");
            student.setPasswordHash(passwordEncoder.encode("student123"));
            student.setRole(Role.STUDENT);
            student.setIsActive(true);

            // Récupérer la filière et le niveau
            Filiere filiere = filiereRepository.findByCode(FiliereCode.PC).orElse(null);
            Niveau niveau = niveauRepository.findByCode(NiveauCode.L2).orElse(null);

            if (filiere != null) student.setFiliere(filiere);
            if (niveau != null) student.setNiveau(niveau);

            userRepository.save(student);
            System.out.println("✅ Étudiant de test créé: student@student.com / student123");
        }
    }
}