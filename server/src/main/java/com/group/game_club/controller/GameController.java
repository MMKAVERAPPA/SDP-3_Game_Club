package com.group.game_club.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;   // ✅ Import this
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group.game_club.entity.Game;
import com.group.game_club.service.GameService;

@RestController
@CrossOrigin("*")
@RequestMapping("/games")
public class GameController {

    @Autowired
    private GameService gameService;

    @PostMapping("/save")
    public Game saveGame(@RequestBody Game game) {
        return gameService.saveGame(game);
    }

    @GetMapping("/all")
    public List<Game> getAllGames() {
        return gameService.getAllGames();
    }

    @GetMapping("/{id}")
    public Game getGameById(@PathVariable String id) {
        return gameService.getGameById(id);
    }

    @PutMapping("/update/{id}")
    public Game updateGame(@PathVariable String id, @RequestBody Game updatedGame) {
        return gameService.updateGame(id, updatedGame);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteGame(@PathVariable String id) {
        boolean deleted = gameService.deleteGame(id);
        if (deleted) {
            return "Game deleted successfully.";
        } else {
            return "Game not found with id: " + id;
        }
    }
}
