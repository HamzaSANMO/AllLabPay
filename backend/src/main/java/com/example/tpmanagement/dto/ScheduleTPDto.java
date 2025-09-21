package com.example.tpmanagement.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class ScheduleTPDto {
    private Long tpId;
    private LocalDateTime scheduledDate;
    private Integer numberOfGroups;
    private Integer maxStudentsPerGroup;
    private List<GroupScheduleDto> groups;
    
    @Data
    public static class GroupScheduleDto {
        private Integer groupNumber;
        private LocalDateTime startTime;
        private LocalDateTime endTime;
        private String room;
    }
}
