package com.group.game_club.controller;

import com.group.game_club.entity.AdminUser;
import com.group.game_club.service.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin-users")
public class AdminUserController {

    @Autowired
    private AdminUserService adminUserService;

    @PostMapping("/save")
    public AdminUser saveAdmin(@RequestBody AdminUser adminUser) {
        return adminUserService.saveAdminUser(adminUser);
    }

    @GetMapping("/all")
    public List<AdminUser> getAllAdmins() {
        return adminUserService.getAllAdmins();
    }

    @GetMapping("/{username}")
    public AdminUser getAdminByUsername(@PathVariable String username) {
        return adminUserService.getAdminByUsername(username);
    }
}
