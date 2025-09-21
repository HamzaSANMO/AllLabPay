package com.example.tpmanagement.service;

import com.example.tpmanagement.entity.AuditLog;
import com.example.tpmanagement.repository.AuditLogRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuditLogService {
    private final AuditLogRepository auditLogRepository;
    private final ObjectMapper objectMapper;

    public AuditLogService(AuditLogRepository auditLogRepository, ObjectMapper objectMapper) {
        this.auditLogRepository = auditLogRepository;
        this.objectMapper = objectMapper;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Page<AuditLog> listAuditLogs(String filter, Pageable pageable) {
        return auditLogRepository.findByActionContainingOrEntityContaining(filter, filter, pageable);
    }

    public void log(Long actorId, String action, String entity, Long entityId, Map<String, Object> payload) {
        try {
            AuditLog auditLog = new AuditLog();
            auditLog.setActorId(actorId);
            auditLog.setAction(action);
            auditLog.setEntity(entity);
            auditLog.setEntityId(entityId);
            auditLog.setPayload(objectMapper.valueToTree(payload));
            auditLogRepository.save(auditLog);
        } catch (Exception e) {
            // Log error but don't fail the main operation
            System.err.println("Failed to create audit log: " + e.getMessage());
        }
    }
}
