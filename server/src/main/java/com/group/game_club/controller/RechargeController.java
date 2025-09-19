package com.group.game_club.controller;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group.game_club.dto.RechargeDto;
import com.group.game_club.dto.RechargeHistoryDto;
import com.group.game_club.entity.Member;
import com.group.game_club.entity.Recharge;
import com.group.game_club.repository.MemberRepository;
import com.group.game_club.repository.RechargeRepository;
import com.group.game_club.service.CollectionsService;

@RestController
@CrossOrigin("*")
@RequestMapping("/recharges")
public class RechargeController {

    @Autowired
    private CollectionsService collectionsService;

    @Autowired
    private RechargeRepository rechargeRepository;

    @Autowired
    private MemberRepository memberRepository;

    @PostMapping("/save")
    public RechargeDto addRecharge(@RequestBody RechargeDto dto) {
        // 1. Fetch member
        Member member = memberRepository.findById(dto.getMemberId())
                .orElseThrow(() -> new RuntimeException("Member not found"));

        // 2. Validate recharge amount
        if (dto.getAmount() < 100 || dto.getAmount() > 1000) {
            throw new RuntimeException("Recharge amount must be between 100 and 1000");
        }

        LocalDate today = LocalDate.now();

// Start and end of today
        Date startOfDay = Date.from(today.atStartOfDay()
                .atZone(ZoneId.systemDefault())
                .toInstant());

        Date endOfDay = Date.from(today.plusDays(1).atStartOfDay()
                .atZone(ZoneId.systemDefault())
                .toInstant());

// Count today's recharges
        long rechargeCountToday = rechargeRepository
                .countByMemberIdAndDateTimeBetween(dto.getMemberId(), startOfDay, endOfDay);

        if (rechargeCountToday >= 5) {
            throw new RuntimeException("Daily recharge limit exceeded (max 5 per day)");
        }
        // 4. Check wallet balance limit (max 10000)
        double newBalance = member.getBalance() + dto.getAmount();
        if (newBalance > 10000) {
            throw new RuntimeException("Recharge failed: Wallet balance cannot exceed 10000");
        }
        // 2. Create recharge
        Recharge recharge = new Recharge(member, dto.getAmount());
        recharge = rechargeRepository.save(recharge);

        // 3. Update member balance
        member.setBalance(member.getBalance() + dto.getAmount());
        memberRepository.save(member);
        collectionsService.addAmountForToday(dto.getAmount());
        // 4. Return DTO
        return new RechargeDto(member.getId(), recharge.getAmount(), recharge.getDateTime(), member.getBalance());
    }

    @GetMapping("/all")
    public List<RechargeDto> getAllRecharges() {
        return rechargeRepository.findAll()
                .stream()
                .map(r -> new RechargeDto(r.getMember().getId(), r.getAmount(), r.getDateTime(), r.getMember().getBalance()))
                .toList();
    }

    @GetMapping("/member/{memberId}")
    public List<RechargeHistoryDto> getRechargesByMemberId(@PathVariable String memberId) {
        return rechargeRepository.findByMemberId(memberId)
                .stream()
                .map(r -> new RechargeHistoryDto(
                r.getMember().getId(),
                r.getAmount(),
                r.getDateTime()
        ))
                .toList();
    }

}
