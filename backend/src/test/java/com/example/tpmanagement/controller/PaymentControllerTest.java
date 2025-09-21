package com.example.tpmanagement.controller;

import com.example.tpmanagement.TpManagementApplication;
import com.example.tpmanagement.dto.InitiatePaymentDto;
import com.example.tpmanagement.dto.WebhookDto;
import com.example.tpmanagement.entity.PaymentProvider;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(classes = TpManagementApplication.class)
@AutoConfigureMockMvc
class PaymentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser(roles = "STUDENT")
    void shouldInitiatePayment() throws Exception {
        InitiatePaymentDto dto = new InitiatePaymentDto();
        dto.setRegistrationId(1L);
        dto.setProvider(PaymentProvider.MTN);

        mockMvc.perform(post("/api/payments/init")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk());
    }

    @Test
    void shouldRejectWebhookWithoutSignature() throws Exception {
        WebhookDto dto = new WebhookDto();
        dto.setReference("REF-123");
        dto.setStatus("SUCCESS");

        mockMvc.perform(post("/api/payments/webhook")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isUnauthorized());
    }
}
