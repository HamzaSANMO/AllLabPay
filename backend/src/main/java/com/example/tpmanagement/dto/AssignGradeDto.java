package com.example.tpmanagement.dto;

import lombok.Data;

@Data
public class AssignGradeDto {
    private Long studentId;
    private Long tpId;
    private Double grade;
    private String feedback;
    private String comments;
}
