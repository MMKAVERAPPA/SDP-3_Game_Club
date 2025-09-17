package com.group.game_club.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;

public class UpdateRechargeDto {

    @NotNull(message = "MemberId cannot be null")
    private String memberId;

    @NotNull(message = "Amount cannot be null")
    private Double amount;

    private LocalDateTime dateTime;

    public String getMemberId() {
        return memberId;
    }
    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public Double getAmount() {
        return amount;
    }
    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }
    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }
}
