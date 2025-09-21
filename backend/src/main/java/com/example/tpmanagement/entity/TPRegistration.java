package com.example.tpmanagement.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tp_registrations")
public class TPRegistration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tp_id", nullable = false)
    private TP tp;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;
    
    @Column(name = "registration_date", nullable = false)
    private LocalDateTime registrationDate = LocalDateTime.now();
    
    @Column(name = "submission_date")
    private LocalDateTime submissionDate;
    
    @Column(name = "submission_file_path")
    private String submissionFilePath;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RegistrationStatus status = RegistrationStatus.PENDING;
    
    @Column(columnDefinition = "TEXT")
    private String comments;
    
    @Column(name = "grade")
    private Double grade;
    
    @Column(name = "feedback", columnDefinition = "TEXT")
    private String feedback;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public TP getTp() { return tp; }
    public void setTp(TP tp) { this.tp = tp; }
    
    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }
    
    public LocalDateTime getRegistrationDate() { return registrationDate; }
    public void setRegistrationDate(LocalDateTime registrationDate) { this.registrationDate = registrationDate; }
    
    public LocalDateTime getSubmissionDate() { return submissionDate; }
    public void setSubmissionDate(LocalDateTime submissionDate) { this.submissionDate = submissionDate; }
    
    public String getSubmissionFilePath() { return submissionFilePath; }
    public void setSubmissionFilePath(String submissionFilePath) { this.submissionFilePath = submissionFilePath; }
    
    public RegistrationStatus getStatus() { return status; }
    public void setStatus(RegistrationStatus status) { this.status = status; }
    
    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }
    
    public Double getGrade() { return grade; }
    public void setGrade(Double grade) { this.grade = grade; }
    
    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }
} 