package com.group.game_club.dto;

import java.util.Date;

import com.group.game_club.entity.Transaction;

public class TransactionResponseDto {
    private String id;
    private String gameName;
    private Double amount;
    private Date dateTime;

    public TransactionResponseDto(Transaction tx) {
        this.id = tx.getId();
        this.gameName = tx.getGame() != null ? tx.getGame().getName() : null;
        this.amount = tx.getAmount();
        this.dateTime = tx.getDateTime();
    }

    public String getId() { return id; }
    public String getGameName() { return gameName; }
    public Double getAmount() { return amount; }
    public Date getDateTime() { return dateTime; }
}
