package com.group.game_club.dto;

import jakarta.validation.constraints.NotNull;

public class CreateRechargeDto {

    @NotNull(message = "MemberId cannot be null")
    private String memberId;

    @NotNull(message = "Amount cannot be null")
    private Double amount;

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
}
