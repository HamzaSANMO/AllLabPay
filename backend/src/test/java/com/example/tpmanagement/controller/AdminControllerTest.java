package com.example.tpmanagement.controller;

import com.example.tpmanagement.dto.CreateTeacherDto;
import com.example.tpmanagement.service.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AdminController.class)
class AdminControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    // ✅ Mock de tous les services utilisés par AdminController
    @MockBean private UserService userService;
    @MockBean private DepartementService departementService;
    @MockBean private AuditLogService auditLogService;
    @MockBean private TpService tpService;
    @MockBean private PaymentService paymentService;
    @MockBean private GradeService gradeService;

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldCreateTeacher() throws Exception {
        CreateTeacherDto dto = new CreateTeacherDto();
        dto.setEmail("teacher@test.com");
        dto.setPassword("pass123");
        dto.setDepartement("Maths");

        when(userService.findByEmail("admin@test.com")).thenReturn(java.util.Optional.empty());

        mockMvc.perform(post("/api/admin/users/teachers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk());
    }
}
