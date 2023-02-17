package ru.kata.spring.boot_security.demo.controllers;


import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.ArrayList;
import java.util.List;


@Controller
@RequestMapping("/admin")

public class AdminController {

    @GetMapping()
    public String allUsers() {
        return "admin/admin";
    }

}

