package com.group.game_club.dto;

import java.util.Date;

public class GameHistoryDto {

    private String id;
    private String name;
    private Double amount;
    private Date dateTime;

    public GameHistoryDto(String id, String name, Double amount, Date dateTime) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.dateTime = dateTime;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

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
