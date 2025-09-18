package com.group.game_club.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "members")
public class Member {

    @Id
    private String id;

    private String name;

    private Double balance = 0.0;

    private String role = "USER";

    @Indexed(unique = true)
    private String email;

    private String password;

    @Indexed(unique = true)
    private String phone;

    // Default constructor
    public Member() {}


    // Full constructor
    public Member(String id, String name, Double balance,String role, String email, String password, String phone) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.balance = balance != null ? balance : 0.0;
        this.email = email;
        this.password = password;
        this.phone = phone;
    }

    public String getRole() {
        return role;
    }


    public void setRole(String role) {
        this.role = role;
    }


    // Getters and Setters
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public Double getBalance() {
        return balance;
    }
    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }

}
