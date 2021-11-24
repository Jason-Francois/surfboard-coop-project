const express = require("express");
const router = express.Router();
const con = require("../models/db");
const validToken = require("../middleware/Auth");

router.get("/", validToken, (req, res) => {
  const query = `SELECT * FROM events WHERE user_id = '${req.user.id}'`;
  con.query(query, (err, result) => {
    if (err) throw err;
    res.json({ data: result });
  });
});

router.post("/", validToken, (req, res) => {
  const query = `INSERT INTO events (title, time_estimate, description, username, user_id)
  VALUES ('${req.body.title}', '${req.body.time_estimate}', '${req.body.description}','${req.user.username}', '${req.user.id}')`;
  con.query(query, (err, result) => {
    if (err) throw err;
  });
});

router.delete("/:id", validToken, (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM events WHERE id='${id}'`;
  con.query(query, (err, result) => {
    if (err) throw err;
  });
});

router.put("/:id", validToken, (req, res) => {
  const id = req.params.id;
  const query = `UPDATE events SET title='${req.body.title}', time_estimate='${req.body.time_estimate}', description='${req.body.description}' WHERE id='${id}'`;
  con.query(query, (err, result) => {
    if (err) throw err;
  });
});

module.exports = router;
