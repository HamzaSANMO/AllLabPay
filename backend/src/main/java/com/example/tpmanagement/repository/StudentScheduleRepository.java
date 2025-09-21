package com.example.tpmanagement.repository;

import com.example.tpmanagement.entity.StudentSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentScheduleRepository extends JpaRepository<StudentSchedule, Long> {
    
    List<StudentSchedule> findByStudentId(Long studentId);
    
    List<StudentSchedule> findByScheduleId(Long scheduleId);
    
    List<StudentSchedule> findByStudentIdAndScheduleTpId(Long studentId, Long tpId);
    
    @Query("SELECT ss FROM StudentSchedule ss WHERE ss.student.filiere.id = :filiereId AND ss.schedule.tp.id = :tpId")
    List<StudentSchedule> findByFiliereAndTP(@Param("filiereId") Long filiereId, @Param("tpId") Long tpId);
    
    @Query("SELECT ss FROM StudentSchedule ss WHERE ss.student.niveau.id = :niveauId AND ss.schedule.tp.id = :tpId")
    List<StudentSchedule> findByNiveauAndTP(@Param("niveauId") Long niveauId, @Param("tpId") Long tpId);
}
