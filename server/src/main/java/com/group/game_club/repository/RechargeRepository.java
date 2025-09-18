package com.group.game_club.repository;

import java.util.Date;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.group.game_club.entity.Recharge;

public interface RechargeRepository extends MongoRepository<Recharge, String> {

    // Count recharges between start and end of the day
    long countByMemberIdAndDateTimeBetween(String memberId, Date startOfDay, Date endOfDay);
}
