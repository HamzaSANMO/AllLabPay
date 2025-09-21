package com.example.tpmanagement.service;

import com.example.tpmanagement.entity.*;
import com.example.tpmanagement.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StatisticsService {
    
    private final TPRepository tpRepository;
    private final TPRegistrationRepository registrationRepository;
    private final PaymentRepository paymentRepository;
    private final GradeRepository gradeRepository;
    private final UserRepository userRepository;
    private final FiliereRepository filiereRepository;
    private final DepartementRepository departementRepository;
    
    public Map<String, Object> getGlobalStatistics() {
        Map<String, Object> stats = new HashMap<>();
        
        // Statistiques des TP
        stats.put("totalTPs", tpRepository.count());
        stats.put("activeTPs", tpRepository.countByStatus(TPStatus.PUBLISHED));
        stats.put("draftTPs", tpRepository.countByStatus(TPStatus.DRAFT));
        stats.put("completedTPs", tpRepository.countByStatus(TPStatus.COMPLETED));
        
        // Statistiques des utilisateurs
        stats.put("totalUsers", userRepository.count());
        stats.put("totalStudents", userRepository.countByRole(Role.STUDENT));
        stats.put("totalTeachers", userRepository.countByRole(Role.TEACHER));
        stats.put("activeUsers", userRepository.countByIsActiveTrue());
        
        // Statistiques des inscriptions et paiements
        stats.put("totalRegistrations", registrationRepository.count());
        stats.put("paidRegistrations", registrationRepository.countByStatus(RegistrationStatus.PAID));
        stats.put("pendingRegistrations", registrationRepository.countByStatus(RegistrationStatus.PENDING));
        
        // Statistiques des paiements
        stats.put("totalPayments", paymentRepository.count());
        stats.put("completedPayments", paymentRepository.countByStatus(PaymentStatus.COMPLETED));
        stats.put("pendingPayments", paymentRepository.countByStatus(PaymentStatus.PENDING));
        stats.put("totalAmount", paymentRepository.sumAmountByStatus(PaymentStatus.COMPLETED));
        
        // Statistiques des notes
        stats.put("totalGrades", gradeRepository.count());
        stats.put("averageGrade", gradeRepository.findAverageGrade());
        
        return stats;
    }
    
    public Map<String, Object> getStatisticsByFiliere(Long filiereId) {
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("filiereId", filiereId);
        stats.put("totalTPs", tpRepository.countByMatiereFiliereId(filiereId));
        stats.put("activeTPs", tpRepository.countByStatusAndMatiere_Filiere_Id(TPStatus.PUBLISHED, filiereId));
        stats.put("totalRegistrations", registrationRepository.countByTpMatiereFiliereId(filiereId));
        stats.put("paidRegistrations", registrationRepository.countByStatusAndTpMatiereFiliereId(RegistrationStatus.PAID, filiereId));
        stats.put("totalPayments", paymentRepository.countByRegistrationTpMatiereFiliereId(filiereId));
        stats.put("totalAmount", paymentRepository.sumAmountByRegistrationTpMatiereFiliereId(filiereId));
        
        return stats;
    }
    
    public Map<String, Object> getStatisticsByDepartement(Long departementId) {
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("departementId", departementId);
        stats.put("totalTPs", tpRepository.countByMatiereDepartementId(departementId));
        stats.put("activeTPs", tpRepository.countByStatusAndMatiere_Departement_Id(TPStatus.PUBLISHED, departementId));
        stats.put("totalRegistrations", registrationRepository.countByTpMatiereDepartementId(departementId));
        stats.put("paidRegistrations", registrationRepository.countByStatusAndTpMatiereDepartementId(RegistrationStatus.PAID, departementId));
        stats.put("totalPayments", paymentRepository.countByRegistrationTpMatiereDepartementId(departementId));
        stats.put("totalAmount", paymentRepository.sumAmountByRegistrationTpMatiereDepartementId(departementId));
        
        return stats;
    }
    
    public Map<String, Object> getTeacherStatistics(Long teacherId) {
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("teacherId", teacherId);
        stats.put("totalTPs", tpRepository.countByEnseignantId(teacherId));
        stats.put("activeTPs", tpRepository.countByStatusAndEnseignantId(TPStatus.PUBLISHED, teacherId));
        stats.put("totalRegistrations", registrationRepository.countByTpEnseignantId(teacherId));
        stats.put("paidRegistrations", registrationRepository.countByStatusAndTpEnseignantId(RegistrationStatus.PAID, teacherId));
        stats.put("totalPayments", paymentRepository.countByRegistrationTpEnseignantId(teacherId));
        stats.put("totalAmount", paymentRepository.sumAmountByRegistrationTpEnseignantId(teacherId));
        stats.put("totalGrades", gradeRepository.countByRegistration_Tp_Enseignant_Id(teacherId));
        stats.put("averageGrade", gradeRepository.findAverageGradeByTpEnseignantId(teacherId));
        
        return stats;
    }
}
