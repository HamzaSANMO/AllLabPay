package com.example.tpmanagement.service;

import com.example.tpmanagement.dto.CreateTPDto;
import com.example.tpmanagement.dto.UpdateTPDto;
import com.example.tpmanagement.entity.*;
import com.example.tpmanagement.repository.TPRepository;
import com.example.tpmanagement.repository.MatiereRepository;
import com.example.tpmanagement.repository.FiliereRepository;
import com.example.tpmanagement.repository.NiveauRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class TpService {

    private final TPRepository tpRepository;
    private final MatiereRepository matiereRepository;
    private final FiliereRepository filiereRepository;
    private final NiveauRepository niveauRepository;

    public List<TP> getAllTPs() {
        return tpRepository.findAll();
    }

    public List<TP> getAvailableTPs() {
        return tpRepository.findByStatus(TPStatus.PUBLISHED);
    }
    
    public List<TP> getAvailableTPsByFiliere(Long filiereId) {
        return tpRepository.findByStatusAndMatiere_Filiere_Id(TPStatus.PUBLISHED, filiereId);
    }
    
    public List<TP> getAvailableTPsByNiveau(Long niveauId) {
        return tpRepository.findByStatusAndMatiere_Niveau_Id(TPStatus.PUBLISHED, niveauId);
    }
    
    public List<TP> getAvailableTPsByDepartement(Long departementId) {
        return tpRepository.findByStatusAndMatiere_Departement_Id(TPStatus.PUBLISHED, departementId);
    }

    public List<TP> getTPsByTeacher(Long teacherId) {
        return tpRepository.findByEnseignantId(teacherId);
    }

    public List<TP> getActiveTPs() {
        return tpRepository.findByStatus(TPStatus.PUBLISHED);
    }

    public Optional<TP> getTPById(Long id) {
        return tpRepository.findById(id);
    }

    public TP createTP(CreateTPDto dto, User teacher) {
        TP tp = new TP();
        tp.setTitre(dto.getTitre());
        tp.setDescription(dto.getDescription());
        tp.setFilePath(dto.getFilePath());
        tp.setPrix(dto.getPrix());
        tp.setCapacite(dto.getCapacite());
        tp.setDateDebut(dto.getDateDebut());
        tp.setDateFin(dto.getDateFin());
        tp.setDueDate(dto.getDueDate());
        tp.setMaxPoints(dto.getMaxPoints());
        tp.setRegistrationFee(dto.getRegistrationFee());
        tp.setEnseignant(teacher);
        tp.setStatus(TPStatus.DRAFT);
        
        if (dto.getMatiereId() != null) {
            matiereRepository.findById(dto.getMatiereId()).ifPresent(tp::setMatiere);
        }
        
        return tpRepository.save(tp);
    }

    public TP updateTP(Long id, UpdateTPDto dto) {
        return tpRepository.findById(id).map(tp -> {
            if (dto.getTitre() != null) tp.setTitre(dto.getTitre());
            if (dto.getPrix() != null) tp.setPrix(dto.getPrix());
            if (dto.getCapacite() != null) tp.setCapacite(dto.getCapacite());
            if (dto.getDateDebut() != null) tp.setDateDebut(dto.getDateDebut());
            if (dto.getDateFin() != null) tp.setDateFin(dto.getDateFin());
            if (dto.getStatus() != null) tp.setStatus(TPStatus.valueOf(dto.getStatus()));
            
            if (dto.getMatiereId() != null) {
                matiereRepository.findById(dto.getMatiereId()).ifPresent(tp::setMatiere);
            }
            
            return tpRepository.save(tp);
        }).orElseThrow(() -> new RuntimeException("TP not found"));
    }

    public void deleteTP(Long id) {
        tpRepository.deleteById(id);
    }

    public List<TP> searchTPs(String searchTerm) {
        return tpRepository.findByTitreContainingIgnoreCase(searchTerm);
    }
}