package com.example.tpmanagement.controller;

import com.example.tpmanagement.dto.PaymentResponseDto;
import com.example.tpmanagement.entity.PaymentProvider;
import com.example.tpmanagement.entity.TP;
import com.example.tpmanagement.entity.TPRegistration;
import com.example.tpmanagement.entity.Payment;
import com.example.tpmanagement.service.TpService;
import com.example.tpmanagement.service.TPRegistrationService;
import com.example.tpmanagement.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/student")
@RequiredArgsConstructor
@PreAuthorize("hasRole('STUDENT')")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:80"})
public class StudentController {

    private final TpService tpService;
    private final TPRegistrationService registrationService;
    private final PaymentService paymentService;

    // Voir la liste des TP disponibles
    @GetMapping("/tps")
    public ResponseEntity<List<TP>> getAvailableTPs() {
        List<TP> tps = tpService.getAvailableTPs();
        return ResponseEntity.ok(tps);
    }
    
    // Voir la liste des TP disponibles par filière
    @GetMapping("/tps/filiere/{filiereId}")
    public ResponseEntity<List<TP>> getAvailableTPsByFiliere(@PathVariable Long filiereId) {
        List<TP> tps = tpService.getAvailableTPsByFiliere(filiereId);
        return ResponseEntity.ok(tps);
    }
    
    // Voir la liste des TP disponibles par niveau
    @GetMapping("/tps/niveau/{niveauId}")
    public ResponseEntity<List<TP>> getAvailableTPsByNiveau(@PathVariable Long niveauId) {
        List<TP> tps = tpService.getAvailableTPsByNiveau(niveauId);
        return ResponseEntity.ok(tps);
    }
    
    // Voir la liste des TP disponibles par département
    @GetMapping("/tps/departement/{departementId}")
    public ResponseEntity<List<TP>> getAvailableTPsByDepartement(@PathVariable Long departementId) {
        List<TP> tps = tpService.getAvailableTPsByDepartement(departementId);
        return ResponseEntity.ok(tps);
    }

    // Voir la liste des TP dont le paiement est en cours
    @GetMapping("/tps/payment-pending")
    public ResponseEntity<List<TPRegistration>> getTPsWithPendingPayment() {
        // TODO: Implémenter la logique pour récupérer les TP avec paiement en cours
        return ResponseEntity.ok(List.of());
    }

    // Voir la programmation des TP
    @GetMapping("/tps/schedule")
    public ResponseEntity<List<TP>> getTPSchedule() {
        // TODO: Implémenter la logique pour récupérer la programmation des TP
        return ResponseEntity.ok(List.of());
    }

    // S'inscrire à un TP
    @PostMapping("/tps/{tpId}/register")
    public ResponseEntity<?> registerToTP(@PathVariable Long tpId) {
        try {
            TPRegistration registration = registrationService.registerStudentToTP(tpId);
            return ResponseEntity.ok(Map.of(
                "message", "Inscription réussie au TP",
                "registration", registration
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Erreur lors de l'inscription: " + e.getMessage()
            ));
        }
    }

    // Effectuer le paiement d'un TP
    @PostMapping("/payments/initiate")
    public ResponseEntity<?> initiatePayment(@RequestBody Map<String, Object> paymentRequest) {
        try {
            Long registrationId = Long.valueOf(paymentRequest.get("registrationId").toString());
            String paymentMethod = paymentRequest.get("paymentMethod").toString();

            PaymentResponseDto response = paymentService.initiatePaymentForCurrentUser(
                    registrationId,
                    PaymentProvider.valueOf(paymentMethod.toUpperCase())
            );

            return ResponseEntity.ok(Map.of(
                    "message", "Paiement initié avec succès",
                    "payment", response
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Erreur lors de l'initiation du paiement: " + e.getMessage()
            ));
        }
    }

    // Recevoir le reçu de paiement
    @GetMapping("/payments/{paymentId}/receipt")
    public ResponseEntity<?> getPaymentReceipt(@PathVariable Long paymentId) {
        try {
            Payment payment = paymentService.getPaymentById(paymentId);
            if (payment == null) {
                return ResponseEntity.notFound().build();
            }

            // TODO: Générer et envoyer le reçu par email
            return ResponseEntity.ok(Map.of(
                "message", "Reçu envoyé par email",
                "payment", payment
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Erreur lors de la récupération du reçu: " + e.getMessage()
            ));
        }
    }

    // Voir l'historique des inscriptions
    @GetMapping("/registrations")
    public ResponseEntity<List<TPRegistration>> getMyRegistrations() {
        // TODO: Implémenter la logique pour récupérer les inscriptions de l'étudiant connecté
        return ResponseEntity.ok(List.of());
    }

    // Voir l'historique des paiements
    @GetMapping("/payments")
    public ResponseEntity<List<Payment>> getMyPayments() {
        // TODO: Implémenter la logique pour récupérer les paiements de l'étudiant connecté
        return ResponseEntity.ok(List.of());
    }
}
