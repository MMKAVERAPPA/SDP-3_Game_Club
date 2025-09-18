package com.group.game_club.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group.game_club.entity.Recharge;
import com.group.game_club.repository.RechargeRepository;

@Service
public class RechargeService {

    @Autowired
    private RechargeRepository rechargeRepository;

    public Recharge saveRecharge(Recharge recharge) {
        recharge.setId(null);
        return rechargeRepository.save(recharge);
    }

    public List<Recharge> getAllRecharges() {
        return rechargeRepository.findAll();
    }

    public Recharge getRechargeById(String id) {
        return rechargeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recharge not found with id: " + id));
    }

    public boolean deleteRecharge(String id) {
        if (!rechargeRepository.existsById(id)) {
            return false;
        }
        rechargeRepository.deleteById(id);
        return true;
    }
    public List<Recharge> getRechargesByMemberId(String memberId) {
        return rechargeRepository.findAll()
                .stream()
                .filter(r -> r.getMember().getId().equals(memberId))
                .toList();
    }
    
}
