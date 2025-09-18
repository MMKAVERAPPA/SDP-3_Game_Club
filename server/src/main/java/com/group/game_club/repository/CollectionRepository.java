package com.group.game_club.repository;

import java.util.Date;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.group.game_club.entity.Collection;

@Repository
public interface CollectionRepository extends MongoRepository<Collection, String> {
    Optional<Collection> findByDate(Date date);
}
