/**
 * Sets up database connection
 */

const mysql2 = require("mysql2");
const dbInfo = require("../env.json");
const con = mysql2.createConnection(dbInfo);
module.exports = con;
