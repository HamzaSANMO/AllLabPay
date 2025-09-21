package com.example.tpmanagement.dto;

public class WebhookDto {
    private String reference;
    private String status; // SUCCESS, FAILED

    // Getters and Setters
    public String getReference() { return reference; }
    public void setReference(String reference) { this.reference = reference; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
