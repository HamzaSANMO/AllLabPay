package com.example.tpmanagement.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_schedules")
public class StudentSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id", nullable = false)
    private TPSchedule schedule;
    
    @Column(name = "turn_order", nullable = false)
    private Integer turnOrder;
    
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private TurnStatus status = TurnStatus.SCHEDULED;
    
    @Column(name = "attended", nullable = false)
    private Boolean attended = false;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public enum TurnStatus {
        SCHEDULED, IN_PROGRESS, COMPLETED, MISSED
    }
    
    // Constructeurs
    public StudentSchedule() {}
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }
    
    public TPSchedule getSchedule() { return schedule; }
    public void setSchedule(TPSchedule schedule) { this.schedule = schedule; }
    
    public Integer getTurnOrder() { return turnOrder; }
    public void setTurnOrder(Integer turnOrder) { this.turnOrder = turnOrder; }
    
    public TurnStatus getStatus() { return status; }
    public void setStatus(TurnStatus status) { this.status = status; }
    
    public Boolean getAttended() { return attended; }
    public void setAttended(Boolean attended) { this.attended = attended; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
