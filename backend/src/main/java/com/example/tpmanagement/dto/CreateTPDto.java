package com.example.tpmanagement.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class CreateTPDto {
    private String titre;
    private String description;
    private String filePath;
    private Long matiereId;
    private Double prix;
    private Integer capacite;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private LocalDate dueDate;
    private Double maxPoints;
    private Double registrationFee;
    private List<String> materials;
    private String requirements;
    private String status;
}