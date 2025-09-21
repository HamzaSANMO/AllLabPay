package com.example.tpmanagement.repository;

import com.example.tpmanagement.entity.TP;
import com.example.tpmanagement.entity.TPStatus;
import com.example.tpmanagement.entity.FiliereCode;
import com.example.tpmanagement.entity.NiveauCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TPRepository extends JpaRepository<TP, Long> {

    Page<TP> findByStatusAndMatiere_Filiere_CodeAndMatiere_Niveau_Code(
            TPStatus status, FiliereCode filiereCode, NiveauCode niveauCode, Pageable pageable);

    List<TP> findByEnseignantId(Long enseignantId);

    List<TP> findByStatus(TPStatus status);

    List<TP> findByTitreContainingIgnoreCase(String titre);

    List<TP> findByStatusAndMatiere_Filiere_Id(TPStatus status, Long filiereId);

    List<TP> findByStatusAndMatiere_Niveau_Id(TPStatus status, Long niveauId);

    List<TP> findByStatusAndMatiere_Departement_Id(TPStatus status, Long departementId);

    // ✅ Méthodes nécessaires pour StatisticsService
    long countByStatus(TPStatus status);

    long countByStatusAndMatiere_Filiere_Id(TPStatus status, Long filiereId);

    long countByStatusAndMatiere_Departement_Id(TPStatus status, Long departementId);

    long countByEnseignantId(Long enseignantId);

    long countByStatusAndEnseignantId(TPStatus status, Long enseignantId);

    long countByMatiereFiliereId(Long filiereId);

    long countByMatiereDepartementId(Long departementId);
}
