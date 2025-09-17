package com.group.game_club.entity;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "recharges")
public class Recharge {
    @Id
    private String id;

    @DBRef
    private Member member;  // Reference to members._id

    private Double amount;

    private Date dateTime = new Date(); // default now()

    public Recharge() {}

    public Recharge(Member member, Double amount) {
        this.member = member;
        this.amount = amount;
        this.dateTime = new Date();
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public Member getMember() {
        return member;
    }
    public void setMember(Member member) {
        this.member = member;
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
