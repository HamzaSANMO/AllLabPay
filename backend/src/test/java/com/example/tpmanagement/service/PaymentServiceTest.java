package com.example.tpmanagement.service;

import com.example.tpmanagement.entity.PaymentProvider;
import com.example.tpmanagement.repository.PaymentRepository;
import com.example.tpmanagement.repository.TPRegistrationRepository;
import com.example.tpmanagement.repository.DepartementRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.RestTemplate;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PaymentServiceTest {

    @Mock private PaymentRepository paymentRepository;
    @Mock private TPRegistrationRepository registrationRepository;
    @Mock private DepartementRepository departementRepository;
    @Mock private AuditLogService auditLogService;
    @Mock private RestTemplate restTemplate;

    @InjectMocks
    private PaymentService paymentService;

    @Test
    void shouldPreventDoublePayment() {
        // Given
        when(paymentRepository.existsByRegistrationId(1L)).thenReturn(true);

        // Then
        assertThrows(RuntimeException.class,
                () -> paymentService.initiatePayment(1L, PaymentProvider.MTN, 1L));
    }
}
