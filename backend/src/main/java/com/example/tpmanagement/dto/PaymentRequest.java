package com.example.tpmanagement.dto;

import lombok.Data;

@Data
public class PaymentRequest {
    private Double amount;
    private String numero;
    private String reference;
    private String callbackUrl;
}
