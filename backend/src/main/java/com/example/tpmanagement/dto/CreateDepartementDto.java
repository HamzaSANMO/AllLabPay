package com.example.tpmanagement.dto;

public class CreateDepartementDto {
    private String nom;
    private String numeroMtn;
    private String numeroMoov;
    private String numeroCeltiis;

    // Getters and Setters
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    
    public String getNumeroMtn() { return numeroMtn; }
    public void setNumeroMtn(String numeroMtn) { this.numeroMtn = numeroMtn; }
    
    public String getNumeroMoov() { return numeroMoov; }
    public void setNumeroMoov(String numeroMoov) { this.numeroMoov = numeroMoov; }
    
    public String getNumeroCeltiis() { return numeroCeltiis; }
    public void setNumeroCeltiis(String numeroCeltiis) { this.numeroCeltiis = numeroCeltiis; }
} 