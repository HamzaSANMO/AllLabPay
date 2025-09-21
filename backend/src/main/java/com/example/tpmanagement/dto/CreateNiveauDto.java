package com.example.tpmanagement.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;
import com.example.tpmanagement.entity.NiveauCode;

@Data
public class CreateNiveauDto {
    @NotNull(message = "Code is required")
    private NiveauCode code;
}
