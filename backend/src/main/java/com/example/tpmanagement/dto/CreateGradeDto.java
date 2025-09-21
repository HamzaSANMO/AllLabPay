package com.example.tpmanagement.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;

public class CreateGradeDto {
    
    @NotNull(message = "Registration ID is required")
    private Long registrationId;
    
    @NotNull(message = "Score is required")
    @Min(value = 0, message = "Score cannot be negative")
    @Max(value = 100, message = "Score cannot exceed 100")
    private Double score;
    
    @NotNull(message = "Max score is required")
    @Min(value = 1, message = "Max score must be at least 1")
    private Double maxScore;
    
    private String feedback;

    // Getters and Setters
    public Long getRegistrationId() { return registrationId; }
    public void setRegistrationId(Long registrationId) { this.registrationId = registrationId; }
    
    public Double getScore() { return score; }
    public void setScore(Double score) { this.score = score; }
    
    public Double getMaxScore() { return maxScore; }
    public void setMaxScore(Double maxScore) { this.maxScore = maxScore; }
    
    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }
} 