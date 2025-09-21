package com.example.tpmanagement.controller;

import com.example.tpmanagement.entity.Grade;
import com.example.tpmanagement.dto.CreateGradeDto;
import com.example.tpmanagement.service.GradeService;
import com.example.tpmanagement.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/grades")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:80"})
public class GradeController {
    private final GradeService gradeService;
    private final UserService userService;

    @PostMapping
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<Grade> addGrade(@RequestBody CreateGradeDto dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long teacherId = userService.findByEmail(auth.getName()).orElseThrow().getId();
        
        Grade grade = gradeService.addGrade(dto.getRegistrationId(), dto.getScore(), dto.getMaxScore(), dto.getFeedback(), teacherId);
        return ResponseEntity.ok(grade);
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<Grade>> getMyGrades() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long studentId = userService.findByEmail(auth.getName()).orElseThrow().getId();
        return ResponseEntity.ok(gradeService.getMyGrades(studentId));
    }

    @GetMapping("/tp/{tpId}")
    @PreAuthorize("hasAnyRole('TEACHER', 'ADMIN')")
    public ResponseEntity<List<Grade>> getTPGrades(@PathVariable Long tpId) {
        return ResponseEntity.ok(gradeService.getGradesByTP(tpId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Grade> getGradeById(@PathVariable Long id) {
        return ResponseEntity.ok(gradeService.getGradeById(id));
    }

    @PutMapping("/{id}/finalize")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<Grade> finalizeGrade(@PathVariable Long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long teacherId = userService.findByEmail(auth.getName()).orElseThrow().getId();
        
        Grade grade = gradeService.finalizeGrade(id, teacherId);
        return ResponseEntity.ok(grade);
    }
}
