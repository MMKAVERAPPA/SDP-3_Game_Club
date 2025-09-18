package com.group.game_club.service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group.game_club.entity.Collection;
import com.group.game_club.repository.CollectionRepository;

@Service
public class CollectionsService {

    @Autowired
    private CollectionRepository collectionsRepository;

    public Collection saveCollection(Collection collection) {
        collection.setId(null);
        return collectionsRepository.save(collection);
    }

    public List<Collection> getAllCollections() {
        return collectionsRepository.findAll();
    }

    public Collection getCollectionById(String id) {
        return collectionsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Collection not found with id: " + id));
    }

    public boolean deleteCollection(String id) {
        if (!collectionsRepository.existsById(id)) {
            return false;
        }
        collectionsRepository.deleteById(id);
        return true;
    }

    // ---- New method for daily aggregation ----
    public Collection addAmountForToday(Double amount) {
        LocalDate today = LocalDate.now();
        Date date = Date.from(today.atStartOfDay(ZoneId.systemDefault()).toInstant());

        Collection collection = collectionsRepository.findByDate(date)
                .orElseGet(() -> new Collection(date, 0.0));

        collection.setAmount(collection.getAmount() + amount);
        return collectionsRepository.save(collection);
    }
}
