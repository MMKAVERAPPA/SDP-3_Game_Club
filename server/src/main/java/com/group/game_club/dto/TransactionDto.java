package com.group.game_club.dto;

import java.util.Date;

import com.group.game_club.entity.Transaction;

public class TransactionDto {
    private String id;
    private String memberId;
    private String gameId;
    private Double amount;
    private Date dateTime;

    // Default constructor needed for deserialization
    public TransactionDto() {}

    // Constructor to convert from Transaction entity
    public TransactionDto(Transaction tx) {
        this.id = tx.getId();
        this.memberId = tx.getMember() != null ? tx.getMember().getId() : null;
        this.gameId = tx.getGame() != null ? tx.getGame().getId() : null;
        this.amount = tx.getAmount();
        this.dateTime = tx.getDateTime();
    }

    // Getters and setters
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getMemberId() {
        return memberId;
    }
    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getGameId() {
        return gameId;
    }
    public void setGameId(String gameId) {
        this.gameId = gameId;
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
