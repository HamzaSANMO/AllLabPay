package com.example.tpmanagement.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "departements")
public class Departement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nom;
    
    private String numeroMtn;
    
    private String numeroMoov;
    
    private String numeroCeltiis;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    
    public String getNumeroMtn() { return numeroMtn; }
    public void setNumeroMtn(String numeroMtn) { this.numeroMtn = numeroMtn; }
    
    public String getNumeroMoov() { return numeroMoov; }
    public void setNumeroMoov(String numeroMoov) { this.numeroMoov = numeroMoov; }
    
    public String getNumeroCeltiis() { return numeroCeltiis; }
    public void setNumeroCeltiis(String numeroCeltiis) { this.numeroCeltiis = numeroCeltiis; }
} 