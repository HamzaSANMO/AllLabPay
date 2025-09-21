package com.example.tpmanagement.controller;

import com.example.tpmanagement.entity.TPRegistration;
import com.example.tpmanagement.dto.RegisterTPDto;
import com.example.tpmanagement.service.TPRegistrationService;
import com.example.tpmanagement.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/registrations")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:80"})
public class RegistrationController {
    private final TPRegistrationService registrationService;
    private final UserService userService;

    @PostMapping
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<TPRegistration> register(@RequestBody RegisterTPDto dto) {
        // studentId from SecurityContext
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long studentId = userService.findByEmail(auth.getName()).orElseThrow().getId();
        return ResponseEntity.ok(registrationService.register(dto.getTpId(), studentId));
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<TPRegistration>> getMyRegistrations() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long studentId = userService.findByEmail(auth.getName()).orElseThrow().getId();
        return ResponseEntity.ok(registrationService.getMyRegistrations(studentId));
    }

    @GetMapping("/tp/{tpId}")
    @PreAuthorize("hasAnyRole('TEACHER', 'ADMIN')")
    public ResponseEntity<List<TPRegistration>> getTPRegistrations(@PathVariable Long tpId) {
        return ResponseEntity.ok(registrationService.getTPRegistrations(tpId));
    }
}
