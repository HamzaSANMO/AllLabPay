package com.example.tpmanagement.service;

import com.example.tpmanagement.entity.Filiere;
import com.example.tpmanagement.repository.FiliereRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class FiliereService {
    
    private final FiliereRepository filiereRepository;
    
    public List<Filiere> getAllFilieres() {
        return filiereRepository.findAll();
    }
    
    public Optional<Filiere> getFiliereById(Long id) {
        return filiereRepository.findById(id);
    }
    
    public Filiere createFiliere(Filiere filiere) {
        return filiereRepository.save(filiere);
    }
    
    public Filiere updateFiliere(Long id, Filiere filiereDetails) {
        return filiereRepository.findById(id).map(filiere -> {
            filiere.setNom(filiereDetails.getNom());
            filiere.setCode(filiereDetails.getCode());
            //filiere.setDescription(filiereDetails.getDescription());
            return filiereRepository.save(filiere);
        }).orElseThrow(() -> new RuntimeException("Filiere not found"));
    }
    
    public void deleteFiliere(Long id) {
        filiereRepository.deleteById(id);
    }
    
    public List<Filiere> getFilieresByDepartement(Long departementId) {
        return filiereRepository.findByDepartementId(departementId);
    }
}
