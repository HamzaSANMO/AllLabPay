package com.example.tpmanagement.repository;

import com.example.tpmanagement.entity.Payment;
import com.example.tpmanagement.entity.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    boolean existsByRegistrationId(Long registrationId);

    long countByStatus(PaymentStatus status);

    // Trouver un paiement par sa référence unique
    Optional<Payment> findByReference(String reference);

    // Trouver tous les paiements d’un étudiant via l’inscription (Registration -> Student)
    List<Payment> findByRegistration_StudentId(Long studentId);

    long countByRegistrationTpMatiereFiliereId(Long filiereId);

    long countByRegistrationTpMatiereDepartementId(Long departementId);

    long countByRegistrationTpEnseignantId(Long teacherId);

    @Query("SELECT COALESCE(SUM(p.amount),0) FROM Payment p WHERE p.status = :status")
    Double sumAmountByStatus(PaymentStatus status);

    @Query("SELECT COALESCE(SUM(p.amount),0) FROM Payment p WHERE p.registration.tp.matiere.filiere.id = :filiereId")
    Double sumAmountByRegistrationTpMatiereFiliereId(Long filiereId);

    @Query("SELECT COALESCE(SUM(p.amount),0) FROM Payment p WHERE p.registration.tp.matiere.departement.id = :departementId")
    Double sumAmountByRegistrationTpMatiereDepartementId(Long departementId);

    @Query("SELECT COALESCE(SUM(p.amount),0) FROM Payment p WHERE p.registration.tp.enseignant.id = :teacherId")
    Double sumAmountByRegistrationTpEnseignantId(Long teacherId);
}
