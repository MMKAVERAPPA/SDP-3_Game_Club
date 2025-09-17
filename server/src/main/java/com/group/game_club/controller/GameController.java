package com.group.game_club.controller;

import com.group.game_club.entity.Game;
import com.group.game_club.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
