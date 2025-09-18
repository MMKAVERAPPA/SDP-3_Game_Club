package com.group.game_club.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateMemberDto {

    @NotBlank(message = "Name cannot be empty")
    private String name;

    @NotNull(message = "Balance cannot be null")
    private Double balance = 0.0;

    @NotBlank(message = "Phone cannot be empty")
    private String phone;

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

    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
}
