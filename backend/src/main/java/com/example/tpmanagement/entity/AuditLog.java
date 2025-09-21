package com.example.tpmanagement.entity;

import com.example.tpmanagement.config.JsonNodeConverter;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import com.fasterxml.jackson.databind.JsonNode;

@Entity
@Table(name = "audit_logs")
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long actorId;
    
    @Column(nullable = false)
    private String action;
    
    @Column(nullable = false)
    private String entity;
    
    private Long entityId;

    @Column(columnDefinition = "JSON")
    @Convert(converter = JsonNodeConverter.class)
    private JsonNode payload;
    
    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getActorId() { return actorId; }
    public void setActorId(Long actorId) { this.actorId = actorId; }
    
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    
    public String getEntity() { return entity; }
    public void setEntity(String entity) { this.entity = entity; }
    
    public Long getEntityId() { return entityId; }
    public void setEntityId(Long entityId) { this.entityId = entityId; }
    
    public JsonNode getPayload() { return payload; }
    public void setPayload(JsonNode payload) { this.payload = payload; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
} 