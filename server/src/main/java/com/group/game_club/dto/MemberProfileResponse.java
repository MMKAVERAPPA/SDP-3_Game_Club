package com.group.game_club.dto;

import java.util.List;

import com.group.game_club.entity.Member;

public class MemberProfileResponse {

    private Member member;
    private List<TransactionResponseDto> playedHistory;
    private List<RechargeResponseDto> rechargeHistory;

    public MemberProfileResponse() {
    }

    public MemberProfileResponse(Member member, List<TransactionResponseDto> playedHistory,
            List<RechargeResponseDto> rechargeHistory) {
        this.member = member;
        this.playedHistory = playedHistory;
        this.rechargeHistory = rechargeHistory;
    }

    // Getters and setters
    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public List<TransactionResponseDto> getPlayedHistory() {
        return playedHistory;
    }

    public void setPlayedHistory(List<TransactionResponseDto> playedHistory) {
        this.playedHistory = playedHistory;
    }

    public List<RechargeResponseDto> getRechargeHistory() {
        return rechargeHistory;
    }

    public void setRechargeHistory(List<RechargeResponseDto> rechargeHistory) {
        this.rechargeHistory = rechargeHistory;
    }
}
