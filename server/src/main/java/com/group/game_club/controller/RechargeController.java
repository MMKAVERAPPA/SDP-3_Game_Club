package com.group.game_club.controller;

import com.group.game_club.entity.Recharge;
import com.group.game_club.service.RechargeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/recharges")
public class RechargeController {

    @Autowired
    private RechargeService rechargeService;

    @PostMapping("/save")
    public Recharge saveRecharge(@RequestBody Recharge recharge) {
        return rechargeService.saveRecharge(recharge);
    }

    @GetMapping("/all")
    public List<Recharge> getAllRecharges() {
        return rechargeService.getAllRecharges();
    }
}
