package com.example.tpmanagement.service;

import com.example.tpmanagement.entity.Matiere;
import com.example.tpmanagement.repository.MatiereRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MatiereService {
    
    private final MatiereRepository matiereRepository;
    
    public List<Matiere> getAllMatieres() {
        return matiereRepository.findAll();
    }
    
    public Optional<Matiere> getMatiereById(Long id) {
        return matiereRepository.findById(id);
    }
    
    public Matiere createMatiere(Matiere matiere) {
        return matiereRepository.save(matiere);
    }
    
    public Matiere updateMatiere(Long id, Matiere matiereDetails) {
        return matiereRepository.findById(id).map(matiere -> {
            matiere.setNom(matiereDetails.getNom());
            matiere.setCode(matiereDetails.getCode());
            //matiere.setDescription(matiereDetails.getDescription());
            matiere.setFiliere(matiereDetails.getFiliere());
            matiere.setNiveau(matiereDetails.getNiveau());
            matiere.setDepartement(matiereDetails.getDepartement());
            return matiereRepository.save(matiere);
        }).orElseThrow(() -> new RuntimeException("Matiere not found"));
    }
    
    public void deleteMatiere(Long id) {
        matiereRepository.deleteById(id);
    }
    
    public List<Matiere> getMatieresByFiliere(Long filiereId) {
        return matiereRepository.findByFiliereId(filiereId);
    }
    
    public List<Matiere> getMatieresByNiveau(Long niveauId) {
        return matiereRepository.findByNiveauId(niveauId);
    }
    
    public List<Matiere> getMatieresByDepartement(Long departementId) {
        return matiereRepository.findByDepartementId(departementId);
    }
}
