package com.labpay.controller;

import com.labpay.model.User;
import com.labpay.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        // Ne pas exposer les mots de passe
        users.forEach(user -> user.setPassword(null));
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> userOptional = userService.getUserById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(null); // Ne pas exposer le mot de passe
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> userOptional = userService.getUserByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(null); // Ne pas exposer le mot de passe
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/student/{studentId}")
    public ResponseEntity<User> getUserByStudentId(@PathVariable String studentId) {
        Optional<User> userOptional = userService.getUserByStudentId(studentId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(null); // Ne pas exposer le mot de passe
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }
}