package com.group.game_club.service;

import com.group.game_club.entity.AdminUser;
import com.group.game_club.repository.AdminUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminUserService {

    @Autowired
    private AdminUserRepository adminUserRepository;

    public AdminUser saveAdminUser(AdminUser adminUser) {
        adminUser.setId(null);
        return adminUserRepository.save(adminUser);
    }

    public List<AdminUser> getAllAdmins() {
        return adminUserRepository.findAll();
    }

    public AdminUser getAdminByUsername(String username) {
        return adminUserRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Admin not found with username: " + username));
    }

    public boolean deleteAdmin(String id) {
        if (!adminUserRepository.existsById(id)) {
            return false;
        }
        adminUserRepository.deleteById(id);
        return true;
    }
}
