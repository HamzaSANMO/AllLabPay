package com.example.tpmanagement.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "niveaux")
public class Niveau {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true)
    private NiveauCode code;
    
    @Column(nullable = false)
    private String nom;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public NiveauCode getCode() { return code; }
    public void setCode(NiveauCode code) { this.code = code; }
    
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
} 