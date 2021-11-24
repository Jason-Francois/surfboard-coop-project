CREATE DATABASE IF NOT EXISTS agendaDB;
USE agendaDB;
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE events (
    id INT NOT NULL AUTO_INCREMENT title VARCHAR(100) NOT NULL,
    time_estimate INT,
    description VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    user_id int NOT NULL,
    PRIMARY KEY(id)
);