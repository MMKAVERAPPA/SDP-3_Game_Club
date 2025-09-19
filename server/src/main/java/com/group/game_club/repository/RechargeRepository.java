package com.group.game_club.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.group.game_club.entity.Recharge;

public interface RechargeRepository extends MongoRepository<Recharge, String> {
    List<Recharge> findByMemberId(String memberId);

    long countByMemberIdAndDateTimeBetween(String memberId, Date start, Date end);
}
