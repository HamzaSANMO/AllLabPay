package com.example.tpmanagement.dto;

import jakarta.validation.constraints.NotBlank;

public class LoginDto {
    
    @NotBlank(message = "Email or Matricule is required")
    private String emailOrMatricule;
    
    @NotBlank(message = "Password is required")
    private String password;

    // Getters and Setters
    public String getEmailOrMatricule() { return emailOrMatricule; }
    public void setEmailOrMatricule(String emailOrMatricule) { this.emailOrMatricule = emailOrMatricule; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
} 