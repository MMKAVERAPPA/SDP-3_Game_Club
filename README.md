# Game Club Management System

A Spring Boot + MongoDB application to manage a game club.  
This project allows management of members, games, recharges, transactions, and admin users via REST APIs.

---

## Features

- *Member Management*: Add, update, delete, and view club members.
- *Game Management*: Add, update, delete, and view games available in the club.
- *Recharge Management*: Add and view member account recharges.
- *Transaction Management*: Track game purchases and related transactions.
- *Admin User Management*: Manage admin accounts for the system.

---

## Tech Stack

- *Backend*: Java, Spring Boot, Spring Data MongoDB
- *Database*: MongoDB
- *Build Tool*: Maven
- *API Testing*: Postman/Thunder Client
- *Deployment*: Render

---

## Project Structure

- `entity/` - MongoDB entity classes (Member, Game, Recharge, Transaction, AdminUser)
- `repository/` - Spring Data MongoDB repositories
- `service/` - Business logic services
- `controller/` - REST controllers
- `dto/` - Data Transfer Objects for create/update operations

---

## Running the Project

**1. Clone the repository:**
- bash
- git clone https://github.com/MMKAVERAPPA/SDP-3_Game_Club
   
**2. Configure MongoDB connection in application.properties:**
   spring.data.mongodb.uri= ***Your MongoDB cluster connection***
   
**3. Build and run:**
- mvn clean install
- mvn spring-boot:run

**4. Access APIs via:**
- Server Deployment - https://sdp-3-game-club.onrender.com
- Frontend Deployment - 
   
**5. API Endpoints**

- **Collections:**
   - `POST` /collections/save - Create a new collection or update if it already exists
   - `GET` /collection/all - Get all the collections
- **Games:**
   - `POST` /games/save - Create a new game
   - `GET` /games/all - Get all the games
   - `GET` /games/{id} - Get the game from the game_id

- **Members:**
   - `POST` /members/save - Create a new member
   - `GET` /members/all - Get all the members
   - `GET` /members/{id} - Get a member from a member_id
   - `POST` /members/auth - Authenticate a member from their details
   - `GET` /members/search/{id} - Gets a member's entire games played and recharge history

- **Recharges:**
   - `POST` /recharges/save - Create a new recharge
   - `GET` /recharges/all - Get all the recharges

- **Transactions:**
   - `POST` /transactions/play - Create a new transaction
   - `GET` /transactions/all - Gets all the transactions
 
---

## Authors

- [M M Kaverappa](https://github.com/MMKAVERAPPA)
- [Mithul Kannan](https://github.com/mithulkannan17)
- [Manveeth H V](https://github.com/manveethjain8)