package com.example.hackathon.controller;

import com.example.hackathon.model.User;
import com.example.hackathon.repository.UserRepository;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/register")
public class Registration {

    private final UserRepository userRepository;

    public Registration(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<String> register(@RequestBody User registrationRequest) {
        // validate username
        String nameError = InputValidation.IsValidName(registrationRequest.getUsername());
        if (!nameError.isEmpty()) {
            return ResponseEntity
                     .badRequest()
                     .body(nameError);
        }

        // validate password
        String pwdError = InputValidation.IsValidPassword(registrationRequest.getPassword());
        if (!pwdError.isEmpty()) {
            return ResponseEntity
                     .badRequest()
                     .body(pwdError);
        }

        // check for duplicate username
        boolean exists = userRepository.existsByUsername(registrationRequest.getUsername());
        if (exists) {
            return ResponseEntity
                     .status(HttpStatus.CONFLICT)
                     .body("Username already taken, try another one!");
        }

        // validate email
        String emailError = InputValidation.IsValidEmail(registrationRequest.getEmail());
        if (!emailError.isEmpty()) {
            return ResponseEntity
                     .badRequest()
                     .body(emailError);
        }

        // check for duplicate email
        boolean emailExists = userRepository.existsByEmail(registrationRequest.getEmail());
        if (emailExists) {
            return ResponseEntity
                     .status(HttpStatus.CONFLICT)
                     .body("Email already registered, try another one!");
        }

        // validate phone number
        String phoneError = InputValidation.IsValidPhoneNumber(registrationRequest.getPhoneNumber());
        if (!phoneError.isEmpty()) {
            return ResponseEntity
                     .badRequest()
                     .body(phoneError);
        }

        // check for duplicate phone number
        boolean phoneExists = userRepository.existsByPhoneNumber(registrationRequest.getPhoneNumber());
        if (phoneExists) {
            return ResponseEntity
                     .status(HttpStatus.CONFLICT)
                     .body("Phone number already registered, try another one!");
        }

        String hashedPass = User.getHashPassword(registrationRequest.getPassword());
        User user = new User(
            registrationRequest.getUsername(),
            registrationRequest.getEmail().toLowerCase(),
            hashedPass,
            registrationRequest.getPhoneNumber(),
            registrationRequest.getId_mock()
        );

        userRepository.save(user);

        // respond
        return ResponseEntity
                 .status(HttpStatus.CREATED)
                 .body("User registered successfully");
    }
}