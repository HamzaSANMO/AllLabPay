package com.example.tpmanagement.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class UpdateTPDto {
    private String titre;
    private Double prix;
    private Integer capacite;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private String status;
    private Long matiereId;
}
