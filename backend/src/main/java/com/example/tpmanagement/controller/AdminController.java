package com.example.tpmanagement.controller;

import com.example.tpmanagement.entity.*;
import com.example.tpmanagement.dto.*;
import com.example.tpmanagement.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:80"})
public class AdminController {

    private final UserService userService;
    private final DepartementService departementService;
    private final AuditLogService auditLogService;
    private final TpService tpService;
    private final PaymentService paymentService;
    private final GradeService gradeService;
    private final StatisticsService statisticsService;
    private final FiliereService filiereService;
    private final MatiereService matiereService;
    private final NiveauService niveauService; // Ajouté pour gérer les niveaux

    // ==================== UTILISATEURS ====================
    @PostMapping("/users/teachers")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> createTeacher(@RequestBody CreateTeacherDto dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long adminId = userService.findByEmail(auth.getName()).orElseThrow().getId();

        User teacher = new User();
        teacher.setEmail(dto.getEmail());
        teacher.setPasswordHash(dto.getPassword()); // TODO: hasher le mot de passe
        teacher.setRole(Role.TEACHER);
        teacher.setIsActive(true);

        User savedTeacher = userService.save(teacher);
        return ResponseEntity.ok(savedTeacher);
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> listUsers(@RequestParam(required = false) String role) {
        if (role != null) {
            return ResponseEntity.ok(userService.findByRole(Role.valueOf(role.toUpperCase())));
        }
        return ResponseEntity.ok(userService.findAllActive());
    }

    @PutMapping("/users/{id}/toggle")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> toggleUserActive(@PathVariable Long id, @RequestBody ToggleUserDto dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long adminId = userService.findByEmail(auth.getName()).orElseThrow().getId();

        User user = userService.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setIsActive(dto.isActive());
        userService.save(user);

        return ResponseEntity.ok().build();
    }

    // ==================== DEPARTEMENTS ====================
    @PostMapping("/departements")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Departement> createDepartement(@RequestBody CreateDepartementDto dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long adminId = userService.findByEmail(auth.getName()).orElseThrow().getId();
        return ResponseEntity.ok(departementService.createDepartement(dto, adminId));
    }

    @GetMapping("/departements")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Departement>> listDepartements() {
        return ResponseEntity.ok(departementService.listDepartements());
    }

    // ==================== AUDIT ====================
    @GetMapping("/audit-logs")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<AuditLog>> listAuditLogs(@RequestParam(required = false) String filter, Pageable pageable) {
        return ResponseEntity.ok(auditLogService.listAuditLogs(filter, pageable));
    }

    // ==================== SUPERVISION ====================
    @GetMapping("/supervision/tps")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<TP>> listTPs() {
        return ResponseEntity.ok(tpService.getAllTPs());
    }

    @GetMapping("/supervision/payments")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Payment>> listPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    @GetMapping("/supervision/grades")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Grade>> listGrades() {
        return ResponseEntity.ok(gradeService.getAllGrades());
    }

    // ==================== FILIERES ====================
    @PostMapping("/filieres")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Filiere> createFiliere(@RequestBody CreateFiliereDto dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long adminId = userService.findByEmail(auth.getName()).orElseThrow().getId();

        Filiere filiere = new Filiere();
        filiere.setNom(dto.getNom());
        filiere.setCode(FiliereCode.valueOf(dto.getCode()));

        if (dto.getDepartementId() != null) {
            departementService.findById(dto.getDepartementId())
                    .ifPresent(filiere::setDepartement);
        }

        Filiere savedFiliere = filiereService.createFiliere(filiere);
        return ResponseEntity.ok(savedFiliere);
    }

    @GetMapping("/filieres")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Filiere>> listFilieres() {
        return ResponseEntity.ok(filiereService.getAllFilieres());
    }

    // ==================== MATIERES ====================
    @PostMapping("/matieres")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Matiere> createMatiere(@RequestBody CreateMatiereDto dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long adminId = userService.findByEmail(auth.getName()).orElseThrow().getId();

        Matiere matiere = new Matiere();
        matiere.setNom(dto.getNom());
        matiere.setCode(dto.getCode());

        if (dto.getFiliereId() != null) {
            filiereService.getFiliereById(dto.getFiliereId()).ifPresent(matiere::setFiliere);
        }

        if (dto.getNiveauId() != null) {
            niveauService.findById(dto.getNiveauId()).ifPresent(matiere::setNiveau);
        }

        if (dto.getDepartementId() != null) {
            departementService.findById(dto.getDepartementId()).ifPresent(matiere::setDepartement);
        }

        Matiere savedMatiere = matiereService.createMatiere(matiere);
        return ResponseEntity.ok(savedMatiere);
    }

    @GetMapping("/matieres")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Matiere>> listMatieres() {
        return ResponseEntity.ok(matiereService.getAllMatieres());
    }

    // ==================== STATISTIQUES ====================
    @GetMapping("/statistics/global")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getGlobalStatistics() {
        Map<String, Object> stats = statisticsService.getGlobalStatistics();
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/statistics/filiere/{filiereId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getStatisticsByFiliere(@PathVariable Long filiereId) {
        Map<String, Object> stats = statisticsService.getStatisticsByFiliere(filiereId);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/statistics/departement/{departementId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getStatisticsByDepartement(@PathVariable Long departementId) {
        Map<String, Object> stats = statisticsService.getStatisticsByDepartement(departementId);
        return ResponseEntity.ok(stats);
    }
}
