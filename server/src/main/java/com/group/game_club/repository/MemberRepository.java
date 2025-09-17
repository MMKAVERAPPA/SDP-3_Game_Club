package com.group.game_club.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.group.game_club.entity.Member;

@Repository
public interface MemberRepository extends MongoRepository<Member, String> {
    Optional<Member> findByPhone(String phone);
}
