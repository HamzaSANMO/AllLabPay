package com.example.tpmanagement.dto;

import lombok.Data;
import java.util.List;

@Data
public class LaunchPaymentDto {
    private Long tpId;
    private String paymentInstructions;
    private List<String> recipientNumbers;
    private Double amount;
    private String paymentMethod;
    private String deadline;
}
