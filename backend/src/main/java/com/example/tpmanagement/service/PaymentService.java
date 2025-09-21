package com.example.tpmanagement.service;

import com.example.tpmanagement.entity.Payment;
import com.example.tpmanagement.entity.TPRegistration;
import com.example.tpmanagement.entity.RegistrationStatus;
import com.example.tpmanagement.entity.PaymentStatus;
import com.example.tpmanagement.entity.PaymentProvider;
import com.example.tpmanagement.entity.Matiere;
import com.example.tpmanagement.entity.Departement;
import com.example.tpmanagement.dto.PaymentResponseDto;
import com.example.tpmanagement.dto.WebhookDto;
import com.example.tpmanagement.repository.PaymentRepository;
import com.example.tpmanagement.repository.TPRegistrationRepository;
import com.example.tpmanagement.repository.DepartementRepository;
import com.example.tpmanagement.repository.UserRepository;
import org.springframework.http.HttpMethod;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final TPRegistrationRepository registrationRepository;
    private final DepartementRepository departementRepository;
    private final AuditLogService auditLogService;
    private final RestTemplate restTemplate;
    private final UserRepository userRepository;

    public PaymentService(PaymentRepository paymentRepository, TPRegistrationRepository registrationRepository,
                          DepartementRepository departementRepository, AuditLogService auditLogService,
                          RestTemplate restTemplate, UserRepository userRepository) {
        this.paymentRepository = paymentRepository;
        this.registrationRepository = registrationRepository;
        this.departementRepository = departementRepository;
        this.auditLogService = auditLogService;
        this.restTemplate = restTemplate;
        this.userRepository = userRepository;
    }

    /**
     * Nouvelle méthode : initier un paiement pour l'utilisateur connecté (pas besoin de studentId en dur).
     */
    @PreAuthorize("hasRole('STUDENT')")
    @Transactional
    public PaymentResponseDto initiatePaymentForCurrentUser(Long registrationId, PaymentProvider provider) {
        // 1. Récupérer utilisateur connecté
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        // 2. Récupérer l’étudiant via UserRepository
        var student = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Utilisateur connecté introuvable"));

        // 3. Réutiliser la méthode existante
        return initiatePayment(registrationId, provider, student.getId());
    }

    @PreAuthorize("hasRole('STUDENT')")
    @Transactional
    public PaymentResponseDto initiatePayment(Long registrationId, PaymentProvider provider, Long studentId) {
        if (paymentRepository.existsByRegistrationId(registrationId)) {
            throw new RuntimeException("Payment already exists for this registration");
        }
        TPRegistration registration = registrationRepository.findById(registrationId)
                .orElseThrow(() -> new RuntimeException("Registration not found"));
        if (!registration.getStudent().getId().equals(studentId)) {
            throw new RuntimeException("Unauthorized");
        }
        if (registration.getStatus() != RegistrationStatus.PENDING) {
            throw new RuntimeException("Registration not in PENDING state");
        }

        // Vérifier numéro départemental
        Matiere matiere = registration.getTp().getMatiere();
        Departement departement = departementRepository.findById(matiere.getFiliere().getId())
                .orElseThrow(() -> new RuntimeException("Departement not found"));
        String numero;
        switch (provider) {
            case MTN: numero = departement.getNumeroMtn(); break;
            case MOOV: numero = departement.getNumeroMoov(); break;
            case CELTIIS: numero = departement.getNumeroCeltiis(); break;
            default: throw new RuntimeException("Invalid provider");
        }
        if (numero == null) {
            throw new RuntimeException("No official number for provider " + provider);
        }

        // Simuler appel API opérateur
        String reference = "REF-" + System.currentTimeMillis();
        String redirectUrl = callPaymentGateway(provider, registration.getTp().getPrix(), numero, reference);

        Payment payment = new Payment();
        payment.setRegistration(registration);
        payment.setAmount(registration.getTp().getPrix());
        payment.setProvider(provider);
        payment.setReference(reference);
        payment.setStatus(PaymentStatus.PENDING);
        paymentRepository.save(payment);

        PaymentResponseDto response = new PaymentResponseDto();
        response.setReference(reference);
        response.setRedirectUrl(redirectUrl);
        return response;
    }

    @Transactional
    public void handleWebhook(WebhookDto dto) {
        Payment payment = paymentRepository.findByReference(dto.getReference())
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        if (dto.getStatus().equals("SUCCESS")) {
            payment.setStatus(PaymentStatus.PAID);
            payment.setPaidAt(LocalDateTime.now());
            payment.getRegistration().setStatus(RegistrationStatus.CONFIRMED);
        } else if (dto.getStatus().equals("FAILED")) {
            payment.setStatus(PaymentStatus.FAILED);
        }
        paymentRepository.save(payment);
    }

    @PreAuthorize("hasRole('STUDENT')")
    public List<Payment> getMyPayments(Long studentId) {
        return paymentRepository.findByRegistration_StudentId(studentId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    private String callPaymentGateway(PaymentProvider provider, Double amount, String numero, String reference) {
        String gatewayUrl = switch (provider) {
            case MTN -> "https://api.mtn.com/pay";
            case MOOV -> "https://api.moov.com/pay";
            case CELTIIS -> "https://api.celtiis.com/pay";
        };
        return "https://payment-gateway.com/pay?amount=" + amount + "&reference=" + reference;
    }

    public byte[] generateReceipt(Long paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        String receipt = "Payment Receipt\nReference: " + payment.getReference() +
                "\nAmount: " + payment.getAmount() + " XOF\nProvider: " + payment.getProvider();
        return receipt.getBytes();
    }

    public Payment getPaymentById(Long paymentId) {
        return paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

}
