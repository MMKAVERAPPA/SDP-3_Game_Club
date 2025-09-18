package com.group.game_club.controller;

import com.group.game_club.entity.Collection;
import com.group.game_club.service.CollectionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/collections")
public class CollectionsController {

    @Autowired
    private CollectionsService collectionsService;

    @PostMapping("/save")
    public Collection saveCollection(@RequestBody Collection collection) {
        return collectionsService.saveCollection(collection);
    }

    @GetMapping("/all")
    public List<Collection> getAllCollections() {
        return collectionsService.getAllCollections();
    }
}
