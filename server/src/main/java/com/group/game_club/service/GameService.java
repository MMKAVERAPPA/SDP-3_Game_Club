package com.group.game_club.service;

import com.group.game_club.entity.Game;
import com.group.game_club.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    public Game saveGame(Game game) {
        game.setId(null);
        return gameRepository.save(game);
    }

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Game getGameById(String id) {
        return gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Game not found with id: " + id));
    }

    public boolean deleteGame(String id) {
        if (!gameRepository.existsById(id)) {
            return false;
        }
        gameRepository.deleteById(id);
        return true;
    }
}
