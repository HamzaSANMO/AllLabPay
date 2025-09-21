package com.example.tpmanagement.service;

import com.example.tpmanagement.entity.Departement;
import com.example.tpmanagement.dto.CreateDepartementDto;
import com.example.tpmanagement.repository.DepartementRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class DepartementService {
    private final DepartementRepository departementRepository;
    private final AuditLogService auditLogService;

    public DepartementService(DepartementRepository departementRepository, AuditLogService auditLogService) {
        this.departementRepository = departementRepository;
        this.auditLogService = auditLogService;
    }

    public Optional<Departement> findById(Long id) {
        return departementRepository.findById(id);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public Departement createDepartement(CreateDepartementDto dto, Long adminId) {
        Departement departement = new Departement();
        departement.setNom(dto.getNom());
        departement.setNumeroMtn(dto.getNumeroMtn());
        departement.setNumeroMoov(dto.getNumeroMoov());
        departement.setNumeroCeltiis(dto.getNumeroCeltiis());
        departementRepository.save(departement);
        return departement;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @org.springframework.cache.annotation.Cacheable("departements")
    public List<Departement> listDepartements() {
        return departementRepository.findAll();
    }
}
