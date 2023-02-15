package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

@Controller
public class UserController {
	private final UserService userService;
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping(value = "/user")
	public String userPage(Model model, @AuthenticationPrincipal User user) {
		model.addAttribute("user", user);

		return "user";
	}

}

