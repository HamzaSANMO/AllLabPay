package com.labpay.controller;

import com.labpay.dto.LoginRequest;
import com.labpay.dto.LoginResponse;
import com.labpay.model.User;
import com.labpay.service.JwtService;
import com.labpay.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        Optional<User> userOptional = userService.getUserByEmail(loginRequest.getEmail());
        
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", "Email ou mot de passe incorrect"));
        }
        
        User user = userOptional.get();
        
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", "Email ou mot de passe incorrect"));
        }
        
        String token = jwtService.generateToken(user.getEmail());
        
        // Ne pas exposer le mot de passe dans la réponse
        user.setPassword(null);
        
        LoginResponse response = new LoginResponse(token, user);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user) {
        if (userService.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", "Un utilisateur avec cet email existe déjà"));
        }
        
        if (user.getRole() == com.labpay.model.Role.STUDENT && user.getStudentId() != null) {
            if (userService.existsByStudentId(user.getStudentId())) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Un étudiant avec cet ID existe déjà"));
            }
        }
        
        User savedUser = userService.createUser(user);
        savedUser.setPassword(null); // Ne pas exposer le mot de passe
        
        return ResponseEntity.ok(savedUser);
    }
}