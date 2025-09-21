package com.example.tpmanagement.service;

import com.example.tpmanagement.entity.Niveau;
import com.example.tpmanagement.repository.NiveauRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NiveauService {

    private final NiveauRepository niveauRepository;

    public Optional<Niveau> findById(Long id) {
        return niveauRepository.findById(id);
    }

    public Niveau save(Niveau niveau) {
        return niveauRepository.save(niveau);
    }
}
