package com.example.hackathon.controller;

import com.example.hackathon.model.LoggedUser;
import com.example.hackathon.model.User;
import com.example.hackathon.repository.UserRepository;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
public class Login {

    private final UserRepository userRepository;

    public Login(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @GetMapping("/login")
    public String showLoginPage(HttpSession session, Model model) { 
        LoggedUser user = (LoggedUser) session.getAttribute("user");
        if (user != null) {
            return "redirect:/"; // Redirect to dashboard if user is already logged in
        }
        model.addAttribute("user", new User());
        return "mylogin"; // Return the login page if not logged in
    }

    @PostMapping("/login")
    public String login(@ModelAttribute User loginRequest, HttpSession session, Model model) {
        String credintial = InputValidation.IsValidName(loginRequest.getUsername());
        if (!credintial.isEmpty()) {
            return "mylogin";
        }

        String validatePassword = InputValidation.IsValidPassword(loginRequest.getPassword());
        if (!validatePassword.isEmpty()) {
            model.addAttribute("error", loginRequest.getPassword());
            return "mylogin";
        }


        String password = User.getHashPassword(loginRequest.getPassword());

        Optional<User> userOpt = userRepository.findByUsernameAndPassword(loginRequest.getUsername(), password);

        if (userOpt.isEmpty()) {
            model.addAttribute("error", password);
            return "mylogin";
        }

        LoggedUser user = new LoggedUser(userOpt.get().getUsername(), (String)userOpt.get().getId_mock());
        session.setAttribute("user", user);
        return "redirect:/accounts/"+user.getUserId();
    }
}