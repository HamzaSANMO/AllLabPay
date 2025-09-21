package com.example.tpmanagement.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "grades")
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "registration_id", nullable = false)
    private TPRegistration registration;
    
    @Column(nullable = false)
    private Double score;
    
    @Column(name = "max_score", nullable = false)
    private Double maxScore;
    
    @Column(columnDefinition = "TEXT")
    private String feedback;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "graded_by", nullable = false)
    private User gradedBy;
    
    @Column(name = "graded_at", nullable = false)
    private LocalDateTime gradedAt = LocalDateTime.now();
    
    @Column(name = "is_final")
    private boolean isFinal = false;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public TPRegistration getRegistration() { return registration; }
    public void setRegistration(TPRegistration registration) { this.registration = registration; }
    
    public Double getScore() { return score; }
    public void setScore(Double score) { this.score = score; }
    
    public Double getMaxScore() { return maxScore; }
    public void setMaxScore(Double maxScore) { this.maxScore = maxScore; }
    
    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }
    
    public User getGradedBy() { return gradedBy; }
    public void setGradedBy(User gradedBy) { this.gradedBy = gradedBy; }
    
    public LocalDateTime getGradedAt() { return gradedAt; }
    public void setGradedAt(LocalDateTime gradedAt) { this.gradedAt = gradedAt; }
    
    public boolean isFinal() { return isFinal; }
    public void setIsFinal(boolean isFinal) { this.isFinal = isFinal; }
} 