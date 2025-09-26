package com.labpay.config;

import com.labpay.model.Role;
import com.labpay.model.User;
import com.labpay.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UserService userService;
    
    @Override
    public void run(String... args) throws Exception {
        // Créer des utilisateurs de test
        createTestUsers();
    }
    
    private void createTestUsers() {
        // Étudiant de test
        if (!userService.existsByEmail("student@labpay.com")) {
            User student = new User();
            student.setEmail("student@labpay.com");
            student.setPassword("password123");
            student.setFirstName("Jean");
            student.setLastName("Dupont");
            student.setRole(Role.STUDENT);
            student.setStudentId("2024001");
            student.setDepartment("Informatique");
            userService.createUser(student);
        }
        
        // Enseignant de test
        if (!userService.existsByEmail("teacher@labpay.com")) {
            User teacher = new User();
            teacher.setEmail("teacher@labpay.com");
            teacher.setPassword("password123");
            teacher.setFirstName("Marie");
            teacher.setLastName("Martin");
            teacher.setRole(Role.TEACHER);
            teacher.setDepartment("Informatique");
            userService.createUser(teacher);
        }
        
        // Administrateur de test
        if (!userService.existsByEmail("admin@labpay.com")) {
            User admin = new User();
            admin.setEmail("admin@labpay.com");
            admin.setPassword("password123");
            admin.setFirstName("Admin");
            admin.setLastName("System");
            admin.setRole(Role.ADMIN);
            admin.setDepartment("Administration");
            userService.createUser(admin);
        }
    }
}