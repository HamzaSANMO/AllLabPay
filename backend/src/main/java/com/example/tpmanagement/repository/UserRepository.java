package com.example.tpmanagement.repository;

import com.example.tpmanagement.entity.User;
import com.example.tpmanagement.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByMatricule(String matricule);

    boolean existsByEmail(String email);

    boolean existsByMatricule(String matricule);

    List<User> findByRole(Role role);

    @Query("SELECT u FROM User u WHERE u.isActive = true")
    List<User> findAllActive();

    @Query("SELECT u FROM User u WHERE u.email LIKE %:searchTerm% OR u.matricule LIKE %:searchTerm%")
    List<User> searchUsers(@Param("searchTerm") String searchTerm);

    // ✅ Méthodes nécessaires pour StatisticsService
    long countByRole(Role role);

    long countByIsActiveTrue();
}
