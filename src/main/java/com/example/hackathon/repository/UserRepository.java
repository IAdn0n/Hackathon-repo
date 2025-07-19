package com.example.hackathon.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.hackathon.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndPassword(String email, String password);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    Optional<User> findByUsernameAndPassword(String username, String password);
    boolean existsByPhoneNumber(String phoneNumber);
}
