package com.labpay.service;

import com.labpay.dto.PaymentRequest;
import com.labpay.model.Payment;
import com.labpay.model.PaymentStatus;
import com.labpay.model.User;
import com.labpay.repository.PaymentRepository;
import com.labpay.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {
    
    @Autowired
    private PaymentRepository paymentRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
    
    public List<Payment> getPaymentsByStudentId(String studentId) {
        return paymentRepository.findByStudentId(studentId);
    }
    
    public List<Payment> getPaymentsByStatus(PaymentStatus status) {
        return paymentRepository.findByStatus(status);
    }
    
    public Optional<Payment> getPaymentById(Long id) {
        return paymentRepository.findById(id);
    }
    
    public Payment createPayment(PaymentRequest paymentRequest) {
        User student = userRepository.findByStudentId(paymentRequest.getStudentId())
            .orElseThrow(() -> new RuntimeException("Étudiant non trouvé avec l'ID: " + paymentRequest.getStudentId()));
        
        Payment payment = new Payment();
        payment.setAmount(paymentRequest.getAmount());
        payment.setDescription(paymentRequest.getDescription());
        payment.setStudent(student);
        payment.setStudentId(paymentRequest.getStudentId());
        payment.setDueDate(paymentRequest.getDueDate());
        payment.setLabSession(paymentRequest.getLabSession());
        payment.setCourse(paymentRequest.getCourse());
        
        return paymentRepository.save(payment);
    }
    
    public Payment updatePaymentStatus(Long id, PaymentStatus status) {
        Payment payment = paymentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Paiement non trouvé avec l'ID: " + id));
        
        payment.setStatus(status);
        return paymentRepository.save(payment);
    }
    
    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
}