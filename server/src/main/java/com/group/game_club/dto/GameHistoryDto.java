package com.group.game_club.dto;

import java.util.Date;

public class GameHistoryDto {
    private String gameName;
    private Double amount;
    private Date dateTime;

    public GameHistoryDto(String gameName, Double amount, Date dateTime) {
        this.gameName = gameName;
        this.amount = amount;
        this.dateTime = dateTime;
    }

    // Getters & Setters
    public String getGameName() {
        return gameName;
    }
    public void setGameName(String gameName) {
        this.gameName = gameName;
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
