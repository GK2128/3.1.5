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
    private final UserService userService;
    private final RoleRepository roleRepository;

    public AdminController(UserService userService,
                           RoleRepository roleRepository) {
        this.userService = userService;
        this.roleRepository = roleRepository;
    }


    @GetMapping()
    public String allUsers(Model model, @AuthenticationPrincipal User user) {
        model.addAttribute("users", userService.listUsers());
        model.addAttribute("user", user);
        model.addAttribute("allRoles", userService.listRoles());
        return "admin/admin";
    }

    @GetMapping("/new")
    public String createUserForm(Model model, @AuthenticationPrincipal User user) {
        model.addAttribute("user", new User());
        model.addAttribute("us", user);
        model.addAttribute("allRoles", userService.listRoles());
        return "admin/new";
    }

    @PostMapping(value = "/new")
    public String postAddUser(@ModelAttribute("user") User user, @RequestParam("rolesSelected")Long[] rolesId,
                              BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            return "admin/new";
        }
        List<Role> roles = new ArrayList<>();
        for (Long roleId : rolesId) {
            roles.add(roleRepository.getById(roleId));
        }

        user.setRoles(roles);
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/{id}/delete")
    public String deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }

    @GetMapping("/{id}/edit")
    public String editUserForm(@PathVariable("id") Long id, Model model) {
        model.addAttribute("user", userService.getUser(id)); // добавил
        model.addAttribute("allRoles", userService.listRoles());
        return "admin/edit";
    }

//    @PatchMapping("/{id}/edit")
//    public String editUser(@ModelAttribute("user") User user, @PathVariable("id") Long id, Model model) {
//        model.addAttribute("allRoles", userService.listRoles());
//        userService.updateUser(user);
//        return "redirect:/admin";
//    }
    @PatchMapping(value = "/{id}/edit")
    public String editUse(@ModelAttribute("user") User user, @RequestParam("rolesSelected")Long[] rolesId,
                              BindingResult bindingResult, Model model){
        model.addAttribute("allRoles", userService.listRoles());
        if (bindingResult.hasErrors()) {
            return "admin/admin";
        }
        List<Role> roles = new ArrayList<>();
        for (Long roleId : rolesId) {
            roles.add(roleRepository.getById(roleId));
        }

        user.setRoles(roles);
        userService.updateUser(user);
        return "redirect:/admin";
    }

    @GetMapping(value = "/user")
    public String userPage(Model model, @AuthenticationPrincipal User user) {
        model.addAttribute("user", user);

        return "admin/adminuser";
    }
}


