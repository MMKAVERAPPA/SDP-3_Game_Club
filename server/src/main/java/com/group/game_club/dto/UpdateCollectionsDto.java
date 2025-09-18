package com.group.game_club.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;

public class UpdateCollectionsDto {

    @NotNull(message = "Date cannot be null")
    private LocalDate date;

    @NotNull(message = "Amount cannot be null")
    private Double amount;

    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Double getAmount() {
        return amount;
    }
    public void setAmount(Double amount) {
        this.amount = amount;
    }
}
