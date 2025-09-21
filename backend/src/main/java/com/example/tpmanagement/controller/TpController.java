package com.example.tpmanagement.controller;

import com.example.tpmanagement.dto.CreateTPDto;
import com.example.tpmanagement.dto.UpdateTPDto;
import com.example.tpmanagement.entity.TP;
import com.example.tpmanagement.entity.User;
import com.example.tpmanagement.service.TpService;
import com.example.tpmanagement.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tps")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:80"})
public class TpController {

    private final TpService tpService;
    private final UserService userService;

    public TpController(TpService tpService, UserService userService) {
        this.tpService = tpService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<TP>> getAllTPs() {
        return ResponseEntity.ok(tpService.getAllTPs());
    }

    @GetMapping("/active")
    public ResponseEntity<List<TP>> getActiveTPs() {
        return ResponseEntity.ok(tpService.getActiveTPs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TP> getTPById(@PathVariable Long id) {
        return tpService.getTPById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    //@PreAuthorize("hasRole('TEACHER') or hasRole('ADMIN')")
    @Operation(summary = "Create a new TP", description = "Allows teachers to create a TP in DRAFT state")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "TP created"),
        @ApiResponse(responseCode = "403", description = "Unauthorized")
    })
    public ResponseEntity<TP> createTP(@Valid @RequestBody CreateTPDto dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User teacher = userService.findByEmail(auth.getName()).orElseThrow();
        
        TP createdTP = tpService.createTP(dto, teacher);
        return ResponseEntity.ok(createdTP);
    }

    // Modifier un TP
    @PutMapping("/tps/{tpId}")
    public ResponseEntity<?> updateTP(@PathVariable Long tpId, @RequestBody UpdateTPDto dto) {
        try {
            TP updatedTP = tpService.updateTP(tpId, dto);
            return ResponseEntity.ok(Map.of(
                    "message", "TP modifié avec succès",
                    "tp", updatedTP
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Erreur lors de la modification du TP: " + e.getMessage()
            ));
        }
    }


    @DeleteMapping("/{id}")
    //@PreAuthorize("hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteTP(@PathVariable Long id) {
        tpService.deleteTP(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<TP>> searchTPs(@RequestParam String q) {
        return ResponseEntity.ok(tpService.searchTPs(q));
    }

    @GetMapping("/teacher/{teacherId}")
    //@PreAuthorize("hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<List<TP>> getTPsByTeacher(@PathVariable Long teacherId) {
        return ResponseEntity.ok(tpService.getTPsByTeacher(teacherId));
    }
}