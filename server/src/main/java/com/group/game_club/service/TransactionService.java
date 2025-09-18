package com.group.game_club.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group.game_club.entity.Member;
import com.group.game_club.entity.Transaction;
import com.group.game_club.repository.MemberRepository;
import com.group.game_club.repository.TransactionRepository;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private MemberRepository memberRepository;

    public Transaction saveTransaction(Transaction transaction) {
        transaction.setId(null);

        // Deduct amount from member balance
        Member member = transaction.getMember();
        if (member.getBalance() < transaction.getAmount()) {
            throw new RuntimeException("Insufficient balance for member: " + member.getId());
        }
        member.setBalance(member.getBalance() - transaction.getAmount());
        memberRepository.save(member);  // Update member balance in DB

        return transactionRepository.save(transaction);
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Transaction getTransactionById(String id) {
        return transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found with id: " + id));
    }

    
    public List<Transaction> getTransactionsByMemberId(String memberId) {
        return transactionRepository.findByMember_Id(memberId);
    }

    public boolean deleteTransaction(String id) {
        if (!transactionRepository.existsById(id)) {
            return false;
        }
        transactionRepository.deleteById(id);
        return true;
    }
}
