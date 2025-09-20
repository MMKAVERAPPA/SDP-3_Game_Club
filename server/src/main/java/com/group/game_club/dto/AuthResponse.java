package com.group.game_club.dto;

public class AuthResponse {
    private String id;  // change from Long to String
    private String role;
    private String name;

    public AuthResponse(String id, String role, String name) {
        this.id = id;
        this.role = role;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
