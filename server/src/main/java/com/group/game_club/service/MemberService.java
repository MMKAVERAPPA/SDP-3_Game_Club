package com.group.game_club.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group.game_club.dto.AuthResponse;
import com.group.game_club.entity.Member;
import com.group.game_club.repository.MemberRepository;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    // Create (force a new document by resetting id)
    // Create (force a new document by resetting id)
    public Member saveMember(Member member) {
        member.setId(null);

        // Set default balance if null
        if (member.getBalance() == null) {
            member.setBalance(0.0);
        }

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

        if (updatedMember.getName() != null) {
            existingMember.setName(updatedMember.getName());
        }
        if (updatedMember.getBalance() != null) {
            existingMember.setBalance(updatedMember.getBalance());
        }
        if (updatedMember.getEmail() != null) {
            existingMember.setEmail(updatedMember.getEmail());
        }
        if (updatedMember.getPassword() != null) {
            existingMember.setPassword(updatedMember.getPassword());
        }
        if (updatedMember.getPhone() != null) {
            existingMember.setPhone(updatedMember.getPhone());
        }
        if (updatedMember.getRole() != null) {
            existingMember.setRole(updatedMember.getRole());
        }

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
    public AuthResponse authenticateMember(String email, String password) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Member not found with email: " + email));

        if (member.getPassword().equals(password)) {
            return new AuthResponse(member.getId(), member.getRole(), member.getName());
        } else {
            throw new RuntimeException("Invalid password for email: " + email);
        }
    }
}
