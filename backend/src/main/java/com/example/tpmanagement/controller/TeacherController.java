package com.example.tpmanagement.controller;

import com.example.tpmanagement.dto.*;
import com.example.tpmanagement.entity.*;
import com.example.tpmanagement.service.TpService;
import com.example.tpmanagement.service.TPRegistrationService;
import com.example.tpmanagement.service.PaymentService;
import com.example.tpmanagement.service.GradeService;
import com.example.tpmanagement.service.TPScheduleService;
import com.example.tpmanagement.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/teacher")
@RequiredArgsConstructor
@PreAuthorize("hasRole('TEACHER')")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:80"})
public class TeacherController {

    private final TpService tpService;
    private final TPRegistrationService registrationService;
    private final PaymentService paymentService;
    private final GradeService gradeService;
    private final TPScheduleService scheduleService;
    private final UserService userService;

    // Lancer des paiements pour un TP
    @PostMapping("/tps/{tpId}/launch-payment")
    public ResponseEntity<?> launchPaymentForTP(@PathVariable Long tpId, @RequestBody LaunchPaymentDto dto) {
        try {
            // TODO: Implémenter la logique pour lancer les paiements pour un TP
            return ResponseEntity.ok(Map.of(
                "message", "Paiements lancés avec succès pour le TP",
                "paymentDetails", dto
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Erreur lors du lancement des paiements: " + e.getMessage()
            ));
        }
    }

    // Faire la programmation des TP
    @PostMapping("/tps/schedule")
    public ResponseEntity<?> scheduleTP(@RequestBody ScheduleTPDto dto) {
        try {
            List<TPSchedule> schedules = scheduleService.scheduleTP(dto);
            return ResponseEntity.ok(Map.of(
                "message", "TP programmé avec succès",
                "schedules", schedules
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Erreur lors de la programmation: " + e.getMessage()
            ));
        }
    }

    // Voir la liste des TP créés par l'enseignant
    @GetMapping("/tps")
    public ResponseEntity<List<TP>> getMyTPs() {
        // TODO: Implémenter la logique pour récupérer les TP de l'enseignant connecté
        return ResponseEntity.ok(List.of());
    }

    // Voir les statistiques de paiements
    @GetMapping("/payments/statistics")
    public ResponseEntity<Map<String, Object>> getPaymentStatistics() {
        try {
            // TODO: Implémenter la logique pour récupérer les statistiques de paiements
            Map<String, Object> stats = Map.of(
                "totalPayments", 0,
                "pendingPayments", 0,
                "completedPayments", 0,
                "totalAmount", 0.0
            );
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Erreur lors de la récupération des statistiques: " + e.getMessage()
            ));
        }
    }

    // Voir la liste des inscriptions à un TP
    @GetMapping("/tps/{tpId}/registrations")
    public ResponseEntity<List<TPRegistration>> getTPRegistrations(@PathVariable Long tpId) {
        try {
            // TODO: Implémenter la logique pour récupérer les inscriptions à un TP
            return ResponseEntity.ok(List.of());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(List.of());
        }
    }

    // Attribuer des notes aux étudiants
    @PostMapping("/registrations/{registrationId}/grade")
    public ResponseEntity<?> assignGrade(@PathVariable Long registrationId, @RequestBody AssignGradeDto dto) {
        try {
            // TODO: Implémenter la logique pour attribuer une note
            return ResponseEntity.ok(Map.of(
                "message", "Note attribuée avec succès",
                "gradeDetails", dto
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Erreur lors de l'attribution de la note: " + e.getMessage()
            ));
        }
    }

    // Voir l'historique des paiements pour un TP
    @GetMapping("/tps/{tpId}/payments")
    public ResponseEntity<List<Payment>> getTPPayments(@PathVariable Long tpId) {
        try {
            // TODO: Implémenter la logique pour récupérer les paiements d'un TP
            return ResponseEntity.ok(List.of());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(List.of());
        }
    }

    // Créer un nouveau TP
    @PostMapping("/tps")
    public ResponseEntity<?> createTP(@RequestBody CreateTPDto dto) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            User teacher = userService.findByEmail(auth.getName())
                    .orElseThrow(() -> new RuntimeException("Teacher not found"));
            
            TP tp = tpService.createTP(dto, teacher);
            return ResponseEntity.ok(Map.of(
                "message", "TP créé avec succès",
                "tp", tp
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Erreur lors de la création du TP: " + e.getMessage()
            ));
        }
    }

    // Modifier un TP
    @PutMapping("/tps/{tpId}")
    public ResponseEntity<?> updateTP(@PathVariable Long tpId, @RequestBody UpdateTPDto dto) {
        try {
            TP updatedTP = tpService.updateTP(tpId, dto);
            return ResponseEntity.ok(Map.of(
                "message", "TP modifié avec succès",
                "tp", updatedTP
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Erreur lors de la modification du TP: " + e.getMessage()
            ));
        }
    }
    
    // Voir les TP programmés
    @GetMapping("/tps/{tpId}/schedules")
    public ResponseEntity<List<TPSchedule>> getTPSchedules(@PathVariable Long tpId) {
        try {
            List<TPSchedule> schedules = scheduleService.getTPSchedules(tpId);
            return ResponseEntity.ok(schedules);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(List.of());
        }
    }
    
    // Voir les statistiques détaillées
    @GetMapping("/statistics/detailed")
    public ResponseEntity<Map<String, Object>> getDetailedStatistics() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            User teacher = userService.findByEmail(auth.getName())
                    .orElseThrow(() -> new RuntimeException("Teacher not found"));
            
            Map<String, Object> stats = Map.of(
                "totalTPs", tpService.getTPsByTeacher(teacher.getId()).size(),
                "activeTPs", tpService.getTPsByTeacher(teacher.getId()).stream()
                        .filter(tp -> tp.getStatus() == TPStatus.PUBLISHED).count(),
                "totalRegistrations", registrationService.getRegistrationsByTeacher(teacher.getId()).size(),
                "paidRegistrations", registrationService.getRegistrationsByTeacher(teacher.getId()).stream()
                        .filter(reg -> reg.getStatus() == RegistrationStatus.PAID).count()
            );
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Erreur lors de la récupération des statistiques: " + e.getMessage()
            ));
        }
    }
}
