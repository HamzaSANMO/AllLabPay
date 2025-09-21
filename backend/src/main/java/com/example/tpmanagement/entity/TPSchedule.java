package com.example.tpmanagement.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tp_schedules")
public class TPSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tp_id", nullable = false)
    private TP tp;
    
    @Column(name = "scheduled_date", nullable = false)
    private LocalDateTime scheduledDate;
    
    @Column(name = "group_number", nullable = false)
    private Integer groupNumber;
    
    @Column(name = "max_students_per_group", nullable = false)
    private Integer maxStudentsPerGroup;
    
    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;
    
    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;
    
    @Column(name = "room", nullable = false)
    private String room;
    
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private ScheduleStatus status = ScheduleStatus.PLANNED;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "schedule", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<StudentSchedule> studentSchedules;
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public enum ScheduleStatus {
        PLANNED, IN_PROGRESS, COMPLETED, CANCELLED
    }
    
    // Constructeurs
    public TPSchedule() {}
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public TP getTp() { return tp; }
    public void setTp(TP tp) { this.tp = tp; }
    
    public LocalDateTime getScheduledDate() { return scheduledDate; }
    public void setScheduledDate(LocalDateTime scheduledDate) { this.scheduledDate = scheduledDate; }
    
    public Integer getGroupNumber() { return groupNumber; }
    public void setGroupNumber(Integer groupNumber) { this.groupNumber = groupNumber; }
    
    public Integer getMaxStudentsPerGroup() { return maxStudentsPerGroup; }
    public void setMaxStudentsPerGroup(Integer maxStudentsPerGroup) { this.maxStudentsPerGroup = maxStudentsPerGroup; }
    
    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    
    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    
    public String getRoom() { return room; }
    public void setRoom(String room) { this.room = room; }
    
    public ScheduleStatus getStatus() { return status; }
    public void setStatus(ScheduleStatus status) { this.status = status; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    public List<StudentSchedule> getStudentSchedules() { return studentSchedules; }
    public void setStudentSchedules(List<StudentSchedule> studentSchedules) { this.studentSchedules = studentSchedules; }
}
