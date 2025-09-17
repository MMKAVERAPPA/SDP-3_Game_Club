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
- *Validation*: Jakarta Validation (JSR-380)
- *Build Tool*: Maven
- *API Testing*: Postman / Swagger (optional)

---

## Project Structure

- entity/ - MongoDB entity classes (Member, Game, Recharge, Transaction, AdminUser)
- repository/ - Spring Data MongoDB repositories
- service/ - Business logic services
- controller/ - REST controllers
- dto/ - Data Transfer Objects for create/update operations
- enums/ - Enum types for fields like roles, transaction types, etc.

---

## Running the Project

1. Clone the repository:
   bash
   git clone <repo_url>
2. Configure MongoDB connection in application.properties:

spring.data.mongodb.uri=mongodb://localhost:27017/game_club

3. Build and run:

mvn clean install
mvn spring-boot:run

4. Access APIs via:

http://localhost:8080/

5. API Endpoints (Sample)

POST /members/save - Create a new member

GET /members/all - Get all members

POST /games/save - Create a new game

GET /games/all - Get all games

POST /recharges/save - Add a recharge

POST /transactions/save - Record a transaction

POST /admin-users/save - Create an admin user