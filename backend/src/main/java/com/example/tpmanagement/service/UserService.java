package com.example.tpmanagement.service;

import com.example.tpmanagement.entity.User;
import com.example.tpmanagement.entity.Role;
import com.example.tpmanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String emailOrMatricule) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(emailOrMatricule)
                .or(() -> userRepository.findByMatricule(emailOrMatricule))
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Utilisateur non trouvé avec l'identifiant: " + emailOrMatricule));

        if (!user.isActive()) {
            throw new UsernameNotFoundException("Compte utilisateur désactivé");
        }

        return new org.springframework.security.core.userdetails.User(
                emailOrMatricule, // ⚡️ username = valeur entrée (email ou matricule)
                user.getPasswordHash(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
        );
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findByMatricule(String matricule) {
        return userRepository.findByMatricule(matricule);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean existsByMatricule(String matricule) {
        return userRepository.existsByMatricule(matricule);
    }

    public List<User> findByRole(Role role) {
        return userRepository.findByRole(role);
    }

    public List<User> findAllActive() {
        return userRepository.findAllActive();
    }

    public List<User> searchUsers(String searchTerm) {
        return userRepository.searchUsers(searchTerm);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> findByEmailOrMatricule(String identifier) {
        return userRepository.findByEmail(identifier)
                .or(() -> userRepository.findByMatricule(identifier));
    }
}
