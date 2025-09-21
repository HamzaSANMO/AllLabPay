package com.example.tpmanagement.repository;

import com.example.tpmanagement.entity.Filiere;
import com.example.tpmanagement.entity.FiliereCode;
import com.example.tpmanagement.entity.Matiere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FiliereRepository extends JpaRepository<Filiere, Long> {
    
    Optional<Filiere> findByCode(FiliereCode code);
    
    Optional<Filiere> findByNom(String nom);
    
    boolean existsByCode(FiliereCode code);
    
    boolean existsByNom(String nom);
    
    List<Filiere> findAllByOrderByNomAsc();

    List<Filiere> findByDepartementId(Long departementId);
}

