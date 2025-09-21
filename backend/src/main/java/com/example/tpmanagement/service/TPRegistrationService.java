package com.example.tpmanagement.service;

import com.example.tpmanagement.entity.TPRegistration;
import com.example.tpmanagement.entity.TP;
import com.example.tpmanagement.entity.User;
import com.example.tpmanagement.entity.RegistrationStatus;
import com.example.tpmanagement.repository.TPRegistrationRepository;
import com.example.tpmanagement.repository.TPRepository;
import com.example.tpmanagement.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TPRegistrationService {
    private final TPRegistrationRepository registrationRepository;
    private final TPRepository tpRepository;
    private final UserRepository userRepository;

    public TPRegistrationService(TPRegistrationRepository registrationRepository, TPRepository tpRepository, UserRepository userRepository) {
        this.registrationRepository = registrationRepository;
        this.tpRepository = tpRepository;
        this.userRepository = userRepository;
    }

    /**
     * Nouvelle méthode attendue par le contrôleur :
     * Inscription au TP pour l'étudiant connecté (pas en dur).
     */
    @Transactional
    public TPRegistration registerStudentToTP(Long tpId) {
        // Récupérer l'utilisateur connecté
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // normalement ton "email" ou "username"

        User student = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Utilisateur connecté introuvable"));

        return register(tpId, student.getId());
    }

    // Récupérer toutes les inscriptions pour un TP donné
    public List<TPRegistration> getRegistrationsByTP(Long tpId) {
        return registrationRepository.findByTpId(tpId);
    }

    // Récupérer toutes les inscriptions pour un enseignant
    public List<TPRegistration> getRegistrationsByTeacher(Long teacherId) {
        return registrationRepository.findByTpEnseignantId(teacherId);
    }

    // Récupérer le statut d'une inscription
    public RegistrationStatus getStatus(TPRegistration registration) {
        return registration.getStatus();
    }

    @Transactional
    public TPRegistration register(Long tpId, Long studentId) {
        TP tp = tpRepository.findById(tpId)
                .orElseThrow(() -> new RuntimeException("TP not found"));

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // Vérifier si l'étudiant n'est pas déjà inscrit
        if (registrationRepository.existsByTpIdAndStudentId(tpId, studentId)) {
            throw new RuntimeException("Student already registered for this TP");
        }

        // Vérifier la capacité
        long currentRegistrations = registrationRepository.countByTpId(tpId);
        if (currentRegistrations >= tp.getCapacite()) {
            throw new RuntimeException("TP is full");
        }

        TPRegistration registration = new TPRegistration();
        registration.setTp(tp);
        registration.setStudent(student);
        registration.setRegistrationDate(LocalDateTime.now());
        registration.setStatus(RegistrationStatus.PENDING);

        return registrationRepository.save(registration);
    }

    public List<TPRegistration> getMyRegistrations(Long studentId) {
        return registrationRepository.findByStudentId(studentId);
    }

    public List<TPRegistration> getTPRegistrations(Long tpId) {
        return registrationRepository.findByTpId(tpId);
    }

    public TPRegistration getRegistrationById(Long id) {
        return registrationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registration not found"));
    }

    @Transactional
    public void cancelRegistration(Long registrationId, Long studentId) {
        TPRegistration registration = registrationRepository.findById(registrationId)
                .orElseThrow(() -> new RuntimeException("Registration not found"));

        if (!registration.getStudent().getId().equals(studentId)) {
            throw new RuntimeException("Unauthorized to cancel this registration");
        }

        if (registration.getStatus() != RegistrationStatus.PENDING) {
            throw new RuntimeException("Cannot cancel confirmed registration");
        }

        registrationRepository.delete(registration);
    }
}
