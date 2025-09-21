package com.example.tpmanagement.service;

import com.example.tpmanagement.dto.ScheduleTPDto;
import com.example.tpmanagement.entity.*;
import com.example.tpmanagement.repository.TPScheduleRepository;
import com.example.tpmanagement.repository.StudentScheduleRepository;
import com.example.tpmanagement.repository.TPRepository;
import com.example.tpmanagement.repository.TPRegistrationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TPScheduleService {
    
    private final TPScheduleRepository scheduleRepository;
    private final StudentScheduleRepository studentScheduleRepository;
    private final TPRepository tpRepository;
    private final TPRegistrationRepository registrationRepository;
    
    @Transactional
    public List<TPSchedule> scheduleTP(ScheduleTPDto dto) {
        TP tp = tpRepository.findById(dto.getTpId())
                .orElseThrow(() -> new RuntimeException("TP not found"));
        
        // Récupérer tous les étudiants ayant payé pour ce TP
        List<TPRegistration> paidRegistrations = registrationRepository.findByTpIdAndStatus(
                dto.getTpId(), RegistrationStatus.PAID);
        
        if (paidRegistrations.isEmpty()) {
            throw new RuntimeException("No paid registrations found for this TP");
        }
        
        List<TPSchedule> schedules = new ArrayList<>();
        
        // Créer les groupes
        for (int i = 0; i < dto.getNumberOfGroups(); i++) {
            TPSchedule schedule = new TPSchedule();
            schedule.setTp(tp);
            schedule.setScheduledDate(dto.getScheduledDate());
            schedule.setGroupNumber(i + 1);
            schedule.setMaxStudentsPerGroup(dto.getMaxStudentsPerGroup());
            
            // Assigner les créneaux horaires
            ScheduleTPDto.GroupScheduleDto groupDto = dto.getGroups().get(i);
            schedule.setStartTime(groupDto.getStartTime());
            schedule.setEndTime(groupDto.getEndTime());
            schedule.setRoom(groupDto.getRoom());
            
            TPSchedule savedSchedule = scheduleRepository.save(schedule);
            
            // Assigner les étudiants au groupe
            assignStudentsToGroup(savedSchedule, paidRegistrations, i, dto.getMaxStudentsPerGroup());
            
            schedules.add(savedSchedule);
        }
        
        return schedules;
    }
    
    private void assignStudentsToGroup(TPSchedule schedule, List<TPRegistration> registrations, 
                                     int groupIndex, int maxStudentsPerGroup) {
        int startIndex = groupIndex * maxStudentsPerGroup;
        int endIndex = Math.min(startIndex + maxStudentsPerGroup, registrations.size());
        
        for (int i = startIndex; i < endIndex; i++) {
            TPRegistration registration = registrations.get(i);
            
            StudentSchedule studentSchedule = new StudentSchedule();
            studentSchedule.setStudent(registration.getStudent());
            studentSchedule.setSchedule(schedule);
            studentSchedule.setTurnOrder(i - startIndex + 1);
            
            studentScheduleRepository.save(studentSchedule);
        }
    }
    
    public List<TPSchedule> getTPSchedules(Long tpId) {
        return scheduleRepository.findByTpId(tpId);
    }
    
    public List<TPSchedule> getSchedulesByFiliere(Long filiereId) {
        return scheduleRepository.findByFiliereAndDateAfter(filiereId, LocalDateTime.now());
    }
    
    public List<TPSchedule> getSchedulesByDepartement(Long departementId) {
        return scheduleRepository.findByDepartementAndDateAfter(departementId, LocalDateTime.now());
    }
    
    public List<StudentSchedule> getStudentSchedules(Long studentId) {
        return studentScheduleRepository.findByStudentId(studentId);
    }
    
    public List<StudentSchedule> getStudentSchedulesByTP(Long studentId, Long tpId) {
        return studentScheduleRepository.findByStudentIdAndScheduleTpId(studentId, tpId);
    }
    
    @Transactional
    public void updateScheduleStatus(Long scheduleId, TPSchedule.ScheduleStatus status) {
        TPSchedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new RuntimeException("Schedule not found"));
        schedule.setStatus(status);
        scheduleRepository.save(schedule);
    }
    
    @Transactional
    public void markStudentAttendance(Long studentScheduleId, boolean attended) {
        StudentSchedule studentSchedule = studentScheduleRepository.findById(studentScheduleId)
                .orElseThrow(() -> new RuntimeException("Student schedule not found"));
        studentSchedule.setAttended(attended);
        studentScheduleRepository.save(studentSchedule);
    }
}
