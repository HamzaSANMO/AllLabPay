package com.example.tpmanagement.dto;

import lombok.Data;

@Data
public class CreateFiliereDto {
    private String nom;
    private String code;
    private String description;
    private Long departementId;
}
