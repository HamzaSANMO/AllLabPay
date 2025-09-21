package com.example.tpmanagement.dto;

import com.example.tpmanagement.entity.PaymentProvider;

public class InitiatePaymentDto {
    private Long registrationId;
    private PaymentProvider provider;

    // Getters and Setters
    public Long getRegistrationId() { return registrationId; }
    public void setRegistrationId(Long registrationId) { this.registrationId = registrationId; }
    
    public PaymentProvider getProvider() { return provider; }
    public void setProvider(PaymentProvider provider) { this.provider = provider; }
}
