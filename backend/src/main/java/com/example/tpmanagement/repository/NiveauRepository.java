package com.example.tpmanagement.repository;

import com.example.tpmanagement.entity.Niveau;
import com.example.tpmanagement.entity.NiveauCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NiveauRepository extends JpaRepository<Niveau, Long> {
    
    Optional<Niveau> findByCode(NiveauCode code);
    
    boolean existsByCode(NiveauCode code);
    
    List<Niveau> findAllByOrderByCodeAsc();
} 