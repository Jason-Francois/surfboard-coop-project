const express = require("express");
const router = express.Router();
const con = require("../models/db");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const validateToken = require("../middleware/Auth");

// Registers user into database
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  // Hash the password, store user in database
  bcrypt.hash(password, 8).then((hash) => {
    const query = `INSERT INTO USERS 
      (username, password) VALUES ('${username}', '${hash}')`;
    con.query(query, (err, result) => {
      if (err) {
        res.send({ error: err });
      } else {
        res.send("User registered!");
      }
    });
  });
});

// Logs user into the app
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM USERS WHERE USERNAME='${username}'`;

  // Check if username and password are valid
  // If there are no errors, login user
  con.query(query, (err, result) => {
    if (err) res.send(err);

    if (result.length == 0) {
      res.send({ error: "Username is invalid" });
    } else {
      let loginInfo = result[0];
      bcrypt.compare(password, loginInfo.password).then((response) => {
        if (!response) {
          res.send({ error: "Wrong username/password combo" });
        } else {
          // Get JWT token and store it
          const accessToken = sign(
            {
              username: loginInfo.username,
              id: loginInfo.id,
            },
            "secret"
          );
          res.send(accessToken);
        }
      });
    }
  });
});

// Authenticates user
router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
