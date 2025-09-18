package com.group.game_club.dto;

import com.group.game_club.entity.Member;

public class MemberDto {
    private String id;
    private String name;
    private String phone;
    private Double balance;

    public MemberDto(Member member) {
        this.id = member.getId();
        this.name = member.getName();
        this.phone = member.getPhone();
        this.balance = member.getBalance();
    }

    // getters
    public String getId() { return id; }
    public String getName() { return name; }
    public String getPhone() { return phone; }
    public Double getBalance() { return balance; }
}
