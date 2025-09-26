package com.labpay.repository;

import com.labpay.model.Payment;
import com.labpay.model.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    
    List<Payment> findByStudentId(String studentId);
    
    List<Payment> findByStatus(PaymentStatus status);
    
    List<Payment> findByStudentIdAndStatus(String studentId, PaymentStatus status);
}