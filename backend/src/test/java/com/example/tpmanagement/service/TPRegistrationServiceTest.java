package com.example.tpmanagement.service;

import com.example.tpmanagement.entity.TP;
import com.example.tpmanagement.entity.TPStatus;
import com.example.tpmanagement.entity.User;
import com.example.tpmanagement.repository.TPRegistrationRepository;
import com.example.tpmanagement.repository.TPRepository;
import com.example.tpmanagement.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TPRegistrationServiceTest {

    @Mock private TPRegistrationRepository registrationRepository;
    @Mock private TPRepository tpRepository;
    @Mock private UserRepository userRepository;

    @InjectMocks
    private TPRegistrationService service;

    @Test
    void shouldFailIfTPFull() {
        // Given
        TP tp = new TP();
        tp.setId(1L);
        tp.setCapacite(1);
        tp.setStatus(TPStatus.PUBLISHED);

        User student = new User();
        student.setId(1L);

        when(tpRepository.findById(1L)).thenReturn(Optional.of(tp));
        when(userRepository.findById(1L)).thenReturn(Optional.of(student));
        when(registrationRepository.existsByTpIdAndStudentId(1L, 1L)).thenReturn(false);
        when(registrationRepository.countByTpId(1L)).thenReturn(1L);

        // Then
        assertThrows(RuntimeException.class, () -> service.register(1L, 1L));
    }
}
