package com.example.tpmanagement.dto;

public class PaymentResponseDto {
    private String reference;
    private String redirectUrl;

    // Getters and Setters
    public String getReference() { return reference; }
    public void setReference(String reference) { this.reference = reference; }
    
    public String getRedirectUrl() { return redirectUrl; }
    public void setRedirectUrl(String redirectUrl) { this.redirectUrl = redirectUrl; }
}
