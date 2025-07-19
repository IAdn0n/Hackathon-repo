package com.example.hackathon.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpSession;

@Controller
public class homeController {
    

    @GetMapping("/")
    public String home(Model model, HttpSession session) {
        return "index";
    }
}
