package com.example.tpmanagement.repository;

import com.example.tpmanagement.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Long> {

    @Query("SELECT COALESCE(AVG(g.score),0) FROM Grade g")
    Double findAverageGrade();

    @Query("SELECT COALESCE(AVG(g.score),0) FROM Grade g WHERE g.registration.tp.enseignant.id = :teacherId")
    Double findAverageGradeByTpEnseignantId(@Param("teacherId") Long teacherId);

    long countByRegistration_Tp_Enseignant_Id(Long teacherId);

    // Récupérer toutes les notes d’un étudiant
    List<Grade> findByRegistration_StudentId(Long studentId);

    // Récupérer toutes les notes d’un TP
    List<Grade> findByRegistration_TpId(Long tpId);
}
