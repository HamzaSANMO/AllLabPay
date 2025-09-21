package com.example.tpmanagement.repository;

import com.example.tpmanagement.entity.Matiere;
import com.example.tpmanagement.entity.Filiere;
import com.example.tpmanagement.entity.Niveau;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MatiereRepository extends JpaRepository<Matiere, Long> {
    
    Optional<Matiere> findByCode(String code);

    // Récupérer toutes les matières d'une filière
    List<Matiere> findByFiliereId(Long filiereId);

    // Récupérer toutes les matières d'un niveau
    List<Matiere> findByNiveauId(Long niveauId);

    // Récupérer toutes les matières d'un département
    List<Matiere> findByDepartementId(Long departementId);
    
    Optional<Matiere> findByNom(String nom);
    
    List<Matiere> findByFiliere(Filiere filiere);
    
    List<Matiere> findByNiveau(Niveau niveau);
    
    List<Matiere> findByFiliereAndNiveau(Filiere filiere, Niveau niveau);
    
    boolean existsByCode(String code);
    
    boolean existsByNom(String nom);
    
    List<Matiere> findAllByOrderByNomAsc();
} 