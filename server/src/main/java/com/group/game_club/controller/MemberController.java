package com.group.game_club.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group.game_club.dto.AuthResponse;
import com.group.game_club.dto.MemberProfileResponse;
import com.group.game_club.dto.RechargeResponseDto;
import com.group.game_club.dto.TransactionResponseDto;
import com.group.game_club.entity.Member;
import com.group.game_club.service.MemberService;
import com.group.game_club.service.RechargeService;
import com.group.game_club.service.TransactionService;

@RestController
@CrossOrigin("*")
@RequestMapping("/members")
public class MemberController {

    @Autowired
    private MemberService memberService;
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private RechargeService rechargeService;

    @PostMapping("/save")
    public Member saveMember(@RequestBody Member member) {
        return memberService.saveMember(member);
    }

    @GetMapping("/all")
    public List<Member> getAllMembers() {
        return memberService.getAllMembers();
    }

    @GetMapping("/{id}")
    public Member getMemberById(@PathVariable String id) {
        return memberService.getMemberById(id);
    }

    @PostMapping("/auth")
    public AuthResponse authenticateMember(@RequestBody Member member) {
        return memberService.authenticateMember(member.getEmail(), member.getPassword());
    }
    
    @GetMapping("/{id}/balance")
    public Double getMemberBalance(@PathVariable String id) {
        Member member = memberService.getMemberById(id);
        return member.getBalance();
    }

   @GetMapping("/search/{id}")
public MemberProfileResponse searchMemberById(@PathVariable String id) {
    Member member = memberService.getMemberById(id);

    // Played history (transactions)
    List<TransactionResponseDto> playedHistory = transactionService
            .getTransactionsByMemberId(id)
            .stream()
            .map(TransactionResponseDto::new)
            .toList();

    // Recharge history
    List<RechargeResponseDto> rechargeHistory = rechargeService
            .getRechargesByMemberId(id)
            .stream()
            .map(RechargeResponseDto::new)
            .toList();

    return new MemberProfileResponse(member, playedHistory, rechargeHistory);
}


    
}
