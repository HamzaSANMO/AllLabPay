package com.example.tpmanagement.service;

import com.example.tpmanagement.entity.Grade;
import com.example.tpmanagement.entity.TPRegistration;
import com.example.tpmanagement.entity.User;
import com.example.tpmanagement.repository.GradeRepository;
import com.example.tpmanagement.repository.TPRegistrationRepository;
import com.example.tpmanagement.repository.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class GradeService {
    private final GradeRepository gradeRepository;
    private final TPRegistrationRepository registrationRepository;
    private final UserRepository userRepository;

    public GradeService(GradeRepository gradeRepository, TPRegistrationRepository registrationRepository, UserRepository userRepository) {
        this.gradeRepository = gradeRepository;
        this.registrationRepository = registrationRepository;
        this.userRepository = userRepository;
    }

    @PreAuthorize("hasRole('TEACHER')")
    @Transactional
    public Grade addGrade(Long registrationId, Double score, Double maxScore, String feedback, Long teacherId) {
        TPRegistration registration = registrationRepository.findById(registrationId)
            .orElseThrow(() -> new RuntimeException("Registration not found"));
        
        User teacher = userRepository.findById(teacherId)
            .orElseThrow(() -> new RuntimeException("Teacher not found"));

        Grade grade = new Grade();
        grade.setRegistration(registration);
        grade.setScore(score);
        grade.setMaxScore(maxScore);
        grade.setFeedback(feedback);
        grade.setGradedBy(teacher);
        grade.setGradedAt(LocalDateTime.now());
        grade.setIsFinal(false);

        return gradeRepository.save(grade);
    }

    @PreAuthorize("hasRole('TEACHER')")
    @Transactional
    public Grade finalizeGrade(Long gradeId, Long teacherId) {
        Grade grade = gradeRepository.findById(gradeId)
            .orElseThrow(() -> new RuntimeException("Grade not found"));
        
        if (!grade.getGradedBy().getId().equals(teacherId)) {
            throw new RuntimeException("Unauthorized to finalize this grade");
        }

        grade.setIsFinal(true);
        return gradeRepository.save(grade);
    }

    @PreAuthorize("hasRole('STUDENT')")
    public List<Grade> getMyGrades(Long studentId) {
        return gradeRepository.findByRegistration_StudentId(studentId);
    }

    @PreAuthorize("hasRole('TEACHER')")
    public List<Grade> getGradesByTP(Long tpId) {
        return gradeRepository.findByRegistration_TpId(tpId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<Grade> getAllGrades() {
        return gradeRepository.findAll();
    }

    public Grade getGradeById(Long gradeId) {
        return gradeRepository.findById(gradeId)
            .orElseThrow(() -> new RuntimeException("Grade not found"));
    }
}
