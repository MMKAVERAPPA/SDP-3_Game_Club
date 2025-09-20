package com.group.game_club.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group.game_club.entity.Game;
import com.group.game_club.repository.GameRepository;

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
    public Game updateGame(String id, Game updatedGame) {
    Game existingGame = gameRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Game not found with id: " + id));

    if (updatedGame.getName() != null) {
        existingGame.setName(updatedGame.getName());
    }
    if (updatedGame.getPrice() != null) {
        existingGame.setPrice(updatedGame.getPrice());
    }
    if (updatedGame.getDescription() != null) {
        existingGame.setDescription(updatedGame.getDescription());
    }
    if (updatedGame.getStatus() != null) {
        existingGame.setStatus(updatedGame.getStatus());
    }
    if (updatedGame.getDuration() != null) {
        existingGame.setDuration(updatedGame.getDuration());
    }
    if (updatedGame.getMaxPlayers() != null) {
        existingGame.setMaxPlayers(updatedGame.getMaxPlayers());
    }
    if (updatedGame.getMinPlayers() != null) {
        existingGame.setMinPlayers(updatedGame.getMinPlayers());
    }

    return gameRepository.save(existingGame);
}


    public boolean deleteGame(String id) {
        if (!gameRepository.existsById(id)) {
            return false;
        }
        gameRepository.deleteById(id);
        return true;
    }
}
