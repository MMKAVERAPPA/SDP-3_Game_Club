package com.game.Game_club.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "games")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private BigDecimal price;

    @Lob // For longer text descriptions
    private String description;

    private String status; // e.g., "ACTIVE", "INACTIVE", "MAINTENANCE"
    private Integer duration; // in minutes
    private Integer minPlayerCount;
    private Integer maxPlayerCount;
    private Integer multiplePlayerCount; // e.g., increments of 2, 4

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public Integer getMinPlayerCount() {
        return minPlayerCount;
    }

    public void setMinPlayerCount(Integer minPlayerCount) {
        this.minPlayerCount = minPlayerCount;
    }

    public Integer getMaxPlayerCount() {
        return maxPlayerCount;
    }

    public void setMaxPlayerCount(Integer maxPlayerCount) {
        this.maxPlayerCount = maxPlayerCount;
    }

    public Integer getMultiplePlayerCount() {
        return multiplePlayerCount;
    }

    public void setMultiplePlayerCount(Integer multiplePlayerCount) {
        this.multiplePlayerCount = multiplePlayerCount;
    }
}