package com.example.tpmanagement.service;

import com.example.tpmanagement.dto.CreateTPDto;
import com.example.tpmanagement.entity.Matiere;
import com.example.tpmanagement.entity.TP;
import com.example.tpmanagement.entity.User;
import com.example.tpmanagement.repository.MatiereRepository;
import com.example.tpmanagement.repository.TPRepository;
import com.example.tpmanagement.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TPServiceTest {

    @Mock private TPRepository tpRepository;
    @Mock private MatiereRepository matiereRepository;
    @Mock private UserRepository userRepository;

    @InjectMocks
    private TpService tpService;

    @Test
    void shouldCreateTP() {
        // Given
        CreateTPDto dto = new CreateTPDto();
        dto.setTitre("TP1");
        dto.setMatiereId(1L);
        dto.setPrix(5000.0);
        dto.setCapacite(20);
        dto.setDateDebut(LocalDate.now());
        dto.setDateFin(LocalDate.now().plusDays(1));

        Matiere matiere = new Matiere();
        matiere.setId(1L);
        User enseignant = new User();
        enseignant.setId(1L);

        when(matiereRepository.findById(1L)).thenReturn(Optional.of(matiere));
        when(tpRepository.save(any(TP.class))).thenAnswer(i -> i.getArgument(0));

        // When
        TP result = tpService.createTP(dto, enseignant);

        // Then
        assertEquals("TP1", result.getTitre());
        verify(tpRepository).save(any(TP.class));
    }

    @Test
    void shouldThrowIfMatiereNotFound() {
        // Given
        CreateTPDto dto = new CreateTPDto();
        dto.setMatiereId(1L);
        User enseignant = new User();

        when(matiereRepository.findById(1L)).thenReturn(Optional.empty());

        // Then
        assertThrows(RuntimeException.class, () -> tpService.createTP(dto, enseignant));
    }
}
