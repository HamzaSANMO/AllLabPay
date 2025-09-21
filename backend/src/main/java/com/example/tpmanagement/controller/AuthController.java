package com.example.tpmanagement.controller;

import com.example.tpmanagement.dto.LoginDto;
import com.example.tpmanagement.dto.RegisterDto;
import com.example.tpmanagement.entity.User;
import com.example.tpmanagement.entity.Role;
import com.example.tpmanagement.service.JwtUtil;
import com.example.tpmanagement.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:80"})
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDto dto) {
        try {
            if (userService.existsByEmail(dto.getEmail())) return ResponseEntity.badRequest().body("Email déjà utilisé");
            if (userService.existsByMatricule(dto.getMatricule())) return ResponseEntity.badRequest().body("Matricule déjà utilisé");
            if (!dto.getPassword().equals(dto.getConfirmPassword())) return ResponseEntity.badRequest().body("Les mots de passe ne correspondent pas");

            User user = new User();
            user.setEmail(dto.getEmail());
            user.setMatricule(dto.getMatricule());
            user.setNom(dto.getNom());
            user.setPrenom(dto.getPrenom());
            user.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
            user.setRole(Role.STUDENT);

            userService.save(user);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Compte créé avec succès");
            response.put("user", Map.of(
                    "email", user.getEmail(),
                    "matricule", user.getMatricule(),
                    "nom", user.getNom(),
                    "prenom", user.getPrenom(),
                    "role", user.getRole()
            ));

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur lors de la création du compte: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto dto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(dto.getEmailOrMatricule(), dto.getPassword())
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String jwt = jwtUtil.generateToken(userDetails);

            User user = userService.findByEmailOrMatricule(dto.getEmailOrMatricule())
                    .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

            Map<String, Object> response = new HashMap<>();
            response.put("token", jwt);
            response.put("user", Map.of(
                    "id", user.getId(),
                    "email", user.getEmail(),
                    "matricule", user.getMatricule(),
                    "nom", user.getNom(),
                    "prenom", user.getPrenom(),
                    "role", user.getRole()
            ));

            return ResponseEntity.ok(response);

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Identifiants invalides");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur serveur: " + e.getMessage());
        }
    }
}
