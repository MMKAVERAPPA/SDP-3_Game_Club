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

import com.group.game_club.dto.GameHistoryDto;
import com.group.game_club.dto.TransactionDto;
import com.group.game_club.entity.Game;
import com.group.game_club.entity.Member;
import com.group.game_club.entity.Transaction;
import com.group.game_club.repository.GameRepository;
import com.group.game_club.repository.MemberRepository;
import com.group.game_club.repository.TransactionRepository;
import com.group.game_club.service.TransactionService;

@RestController
@CrossOrigin("*")
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
private MemberRepository memberRepository;

@Autowired
private GameRepository gameRepository;

@Autowired
private TransactionRepository transactionRepository;

   @PostMapping("/play")
public TransactionDto addTransaction(@RequestBody TransactionDto dto) {
    // Fetch actual Member from MongoDB
    Member member = memberRepository.findById(dto.getMemberId())
            .orElseThrow(() -> new RuntimeException("Member not found"));

    // Fetch actual Game from MongoDB
    Game game = gameRepository.findById(dto.getGameId())
            .orElseThrow(() -> new RuntimeException("Game not found"));

    // Check if the member has enough balance
    if (member.getBalance() < dto.getAmount()) {
        throw new RuntimeException("Insufficient balance for member: " + member.getName());
    }

    // Deduct the balance
    member.setBalance(member.getBalance() - dto.getAmount());
    memberRepository.save(member);

    // Create and save the transaction
    Transaction transaction = new Transaction(member, game, dto.getAmount());
    transaction = transactionRepository.save(transaction);

    // Convert saved transaction to DTO
    return new TransactionDto(transaction);
}


@GetMapping("/all")
public List<TransactionDto> getAllTransactions() {
    return transactionService.getAllTransactions()
            .stream()
            .map(TransactionDto::new) // convert each Transaction to TransactionDto
            .toList();
}
@GetMapping("/member/{memberId}")
public List<TransactionDto> getTransactionsByMemberId(@PathVariable String memberId) {
    return transactionRepository.findByMember_Id(memberId)
            .stream()
            .map(TransactionDto::new)
            .toList();
}
@GetMapping("/member/{memberId}/games")
public List<GameHistoryDto> getGameHistoryByMemberId(@PathVariable String memberId) {
    return transactionRepository.findByMember_Id(memberId)
            .stream()
            .map(t -> new GameHistoryDto(
                    t.getId(),
                    t.getGame().getName(),   // ✅ only game name
                    t.getAmount(),
                    t.getDateTime()
            ))
            .toList();
}



}
