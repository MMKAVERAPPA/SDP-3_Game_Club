package com.group.game_club.dto;

import java.util.Date;

import com.group.game_club.entity.Recharge;

public class RechargeResponseDto {
    private String id;
    private Double amount;
    private Date dateTime;

    public RechargeResponseDto() {}

    public RechargeResponseDto(Recharge recharge) {
        this.id = recharge.getId();
        this.amount = recharge.getAmount();
        this.dateTime = recharge.getDateTime();
    }

    // Getters and setters
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }
    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Date getDateTime() {
        return dateTime;
    }
    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }
}
