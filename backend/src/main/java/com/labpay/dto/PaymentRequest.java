package com.labpay.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PaymentRequest {
    
    @NotNull
    @DecimalMin(value = "0.01", message = "Le montant doit être supérieur à 0")
    private BigDecimal amount;
    
    @NotBlank
    private String description;
    
    @NotBlank
    private String studentId;
    
    private LocalDateTime dueDate;
    
    private String labSession;
    
    private String course;
    
    // Constructors
    public PaymentRequest() {}
    
    public PaymentRequest(BigDecimal amount, String description, String studentId) {
        this.amount = amount;
        this.description = description;
        this.studentId = studentId;
    }
    
    // Getters and Setters
    public BigDecimal getAmount() {
        return amount;
    }
    
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getStudentId() {
        return studentId;
    }
    
    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }
    
    public LocalDateTime getDueDate() {
        return dueDate;
    }
    
    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }
    
    public String getLabSession() {
        return labSession;
    }
    
    public void setLabSession(String labSession) {
        this.labSession = labSession;
    }
    
    public String getCourse() {
        return course;
    }
    
    public void setCourse(String course) {
        this.course = course;
    }
}