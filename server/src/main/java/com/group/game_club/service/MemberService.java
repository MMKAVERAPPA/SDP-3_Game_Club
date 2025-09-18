package com.group.game_club.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group.game_club.entity.Member;
import com.group.game_club.repository.MemberRepository;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    // Create (force a new document by resetting id)
    public Member saveMember(Member member) {
        member.setId(null);
        return memberRepository.save(member);
    }

    // Read all
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    // Read by ID
    public Member getMemberById(String id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found with id: " + id));
    }

    // Read by email
    public Member getMemberByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Member not found with email: " + email));
    }

    // Read by phone
    public Member getMemberByPhone(String phone) {
        return memberRepository.findByPhone(phone)
                .orElseThrow(() -> new RuntimeException("Member not found with phone: " + phone));
    }

    // Update existing member
    public Member updateMember(String id, Member updatedMember) {
        Member existingMember = memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found with id: " + id));

        existingMember.setName(updatedMember.getName());
        existingMember.setBalance(updatedMember.getBalance());
        existingMember.setEmail(updatedMember.getEmail());
        existingMember.setPassword(updatedMember.getPassword());
        existingMember.setPhone(updatedMember.getPhone());

        return memberRepository.save(existingMember);
    }

    // Delete
    public boolean deleteMember(String id) {
        if (!memberRepository.existsById(id)) {
            return false;
        }
        memberRepository.deleteById(id);
        return true;
    }
    // Authenticate member by email and password
    public String authenticateMember(String email, String password) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Member not found with email: " + email));

        if (member.getPassword().equals(password)) {
            return member.getId();
        } else {
            throw new RuntimeException("Invalid password for email: " + email);
        }
    }
}
