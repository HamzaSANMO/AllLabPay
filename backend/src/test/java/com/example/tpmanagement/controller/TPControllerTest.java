package com.example.tpmanagement.controller;

import com.example.tpmanagement.dto.CreateTPDto;
import com.example.tpmanagement.entity.TP;
import com.example.tpmanagement.service.TpService;
import com.example.tpmanagement.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TpController.class) // ✅ nom corrigé
class TpControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TpService tpService; // ✅ nom corrigé

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser(roles = "TEACHER")
    void shouldCreateTP() throws Exception {
        CreateTPDto dto = new CreateTPDto();
        dto.setTitre("TP1");
        dto.setMatiereId(1L);
        dto.setPrix(5000.0);
        dto.setCapacite(20);
        dto.setDateDebut(LocalDate.of(2025, 9, 1));
        dto.setDateFin(LocalDate.of(2025, 9, 10));

        TP tp = new TP();
        tp.setId(1L);
        tp.setTitre("TP1");

        when(tpService.createTP(any(CreateTPDto.class), any())).thenReturn(tp);

        mockMvc.perform(post("/api/tps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk());
    }
}
