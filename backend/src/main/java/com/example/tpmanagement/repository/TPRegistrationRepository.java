package com.example.tpmanagement.repository;

import com.example.tpmanagement.entity.TPRegistration;
import com.example.tpmanagement.entity.RegistrationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TPRegistrationRepository extends JpaRepository<TPRegistration, Long> {

    List<TPRegistration> findByStudentId(Long studentId);
    List<TPRegistration> findByTpId(Long tpId);
    boolean existsByTpIdAndStudentId(Long tpId, Long studentId);

    // Méthodes statistiques
    long countByStatus(RegistrationStatus status);

    // Récupérer toutes les inscriptions d’un TP selon son statut
    List<TPRegistration> findByTpIdAndStatus(Long tpId, RegistrationStatus status);

    long countByTpId(Long tpId); // ✅ ajoute cette ligne pour compter les inscriptions par TP

    // Récupérer toutes les inscriptions pour les TP d’un enseignant
    @Query("SELECT tr FROM TPRegistration tr WHERE tr.tp.enseignant.id = :teacherId")
    List<TPRegistration> findByTpEnseignantId(@Param("teacherId") Long teacherId);

    long countByTpMatiereFiliereId(Long filiereId);

    long countByStatusAndTpMatiereFiliereId(RegistrationStatus status, Long filiereId);

    long countByTpMatiereDepartementId(Long departementId);

    long countByStatusAndTpMatiereDepartementId(RegistrationStatus status, Long departementId);

    long countByTpEnseignantId(Long teacherId);

    long countByStatusAndTpEnseignantId(RegistrationStatus status, Long teacherId);
}
