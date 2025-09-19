package com.group.game_club.entity;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "games")
public class Game {
    @Id
    private String id;

    private String name;

    private Double price;
    private String status;
    private Integer duration;
    private Integer maxPlayers;
    private Integer minPlayers;
    private String description;

    public Game() {}

    public Game(String name, Double price, String description, String status, Integer duration, Integer maxPlayers, Integer minPlayers) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.status = status;
        this.duration = duration;
        this.maxPlayers = maxPlayers;
        this.minPlayers = minPlayers;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Integer getMaxPlayers() {
        return maxPlayers;
    }

    public void setMaxPlayers(Integer maxPlayers) {
        this.maxPlayers = maxPlayers;
    }

    public Integer getMinPlayers() {
        return minPlayers;
    }

    public void setMinPlayers(Integer minPlayers) {
        this.minPlayers = minPlayers;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }
    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
}

