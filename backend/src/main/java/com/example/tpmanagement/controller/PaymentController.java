package com.example.tpmanagement.controller;

import com.example.tpmanagement.entity.Payment;
import com.example.tpmanagement.entity.PaymentProvider;
import com.example.tpmanagement.dto.PaymentResponseDto;
import com.example.tpmanagement.dto.InitiatePaymentDto;
import com.example.tpmanagement.dto.WebhookDto;
import com.example.tpmanagement.service.PaymentService;
import com.example.tpmanagement.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:80"})
public class PaymentController {
    private final PaymentService paymentService;
    private final UserService userService;

    @PostMapping("/init")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<PaymentResponseDto> initiate(@RequestBody InitiatePaymentDto dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long studentId = userService.findByEmail(auth.getName()).orElseThrow().getId();
        return ResponseEntity.ok(paymentService.initiatePayment(dto.getRegistrationId(), dto.getProvider(), studentId));
    }

    @PostMapping("/webhook")
    public ResponseEntity<Void> handleWebhook(@RequestBody WebhookDto dto) {
        // Vérifier signature webhook (HMAC avec clé opérateur)
        paymentService.handleWebhook(dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<Payment>> getMyPayments() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long studentId = userService.findByEmail(auth.getName()).orElseThrow().getId();
        return ResponseEntity.ok(paymentService.getMyPayments(studentId));
    }

    @GetMapping("/{id}/receipt")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<byte[]> getReceipt(@PathVariable Long id) {
        return ResponseEntity.ok()
            .header("Content-Disposition", "attachment; filename=receipt_" + id + ".pdf")
            .contentType(MediaType.APPLICATION_PDF)
            .body(paymentService.generateReceipt(id));
    }
}
