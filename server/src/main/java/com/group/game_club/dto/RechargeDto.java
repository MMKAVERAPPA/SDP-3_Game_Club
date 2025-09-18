package com.group.game_club.dto;

import java.util.Date;

public class RechargeDto {
    private String memberId;
    private Double amount;
    private Date dateTime; // optional for response

    public RechargeDto() {}

    public RechargeDto(String memberId, Double amount, Date dateTime) {
        this.memberId = memberId;
        this.amount = amount;
        this.dateTime = dateTime;
    }

    public String getMemberId() { return memberId; }
    public void setMemberId(String memberId) { this.memberId = memberId; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public Date getDateTime() { return dateTime; }
    public void setDateTime(Date dateTime) { this.dateTime = dateTime; }
}
