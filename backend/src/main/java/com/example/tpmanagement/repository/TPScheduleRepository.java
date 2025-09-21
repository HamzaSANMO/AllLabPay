package com.example.tpmanagement.repository;

import com.example.tpmanagement.entity.TPSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TPScheduleRepository extends JpaRepository<TPSchedule, Long> {
    
    List<TPSchedule> findByTpId(Long tpId);
    
    List<TPSchedule> findByTpIdAndStatus(Long tpId, TPSchedule.ScheduleStatus status);

    @Query("SELECT ts FROM TPSchedule ts WHERE ts.tp.matiere.filiere.id = :filiereId AND ts.scheduledDate >= :startDate")
    List<TPSchedule> findByFiliereAndDateAfter(@Param("filiereId") Long filiereId, @Param("startDate") LocalDateTime startDate);

    @Query("SELECT ts FROM TPSchedule ts WHERE ts.tp.matiere.departement.id = :departementId AND ts.scheduledDate >= :startDate")
    List<TPSchedule> findByDepartementAndDateAfter(@Param("departementId") Long departementId, @Param("startDate") LocalDateTime startDate);

    List<TPSchedule> findByScheduledDateBetween(LocalDateTime startDate, LocalDateTime endDate);
}
