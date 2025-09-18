package com.group.game_club.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.group.game_club.entity.Collection;

@Repository
public interface CollectionsRepository extends MongoRepository<Collection, String> {
}
