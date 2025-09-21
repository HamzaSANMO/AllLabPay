package com.example.tpmanagement.dto;

import lombok.Data;

@Data
public class CreateMatiereDto {
    private String nom;
    private String code;
    private String description;
    private Long filiereId;
    private Long niveauId;
    private Long departementId;
}
