package com.group.game_club.service;

import com.group.game_club.entity.Collection;
import com.group.game_club.repository.CollectionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollectionsService {

    @Autowired
    private CollectionsRepository collectionsRepository;

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
}
