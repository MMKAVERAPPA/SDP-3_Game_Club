

package com.group.game_club.dto;

import java.util.Date;

public class GameHistoryDto {
    private String gameId;
    private String gameName;
    private double amount;
    private Date dateTime;

    public GameHistoryDto(String gameId, String gameName, double amount, Date dateTime) {
        this.gameId = gameId;
        this.gameName = gameName;
        this.amount = amount;
        this.dateTime = dateTime;
    }

    // Getters and Setters
    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public String getGameName() {
        return gameName;
    }

    public void setGameName(String gameName) {
        this.gameName = gameName;
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
