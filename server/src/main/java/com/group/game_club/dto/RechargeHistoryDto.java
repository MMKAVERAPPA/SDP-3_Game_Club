package com.group.game_club.dto;

import java.util.Date;

public class RechargeHistoryDto {
    private String rechargeId;
    private double amount;
    private Date dateTime;

    public RechargeHistoryDto(String rechargeId, double amount, Date dateTime) {
        this.rechargeId = rechargeId;
        this.amount = amount;
        this.dateTime = dateTime;
    }

    // Getters & Setters
    public String getRechargeId() {
        return rechargeId;
    }

    public void setRechargeId(String rechargeId) {
        this.rechargeId = rechargeId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }
}
