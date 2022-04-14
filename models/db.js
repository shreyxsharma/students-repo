const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");
// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});
// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

connection.query({
  sql: 'CREATE DATABASE IF NOT EXISTS nanoleaf',
  timeout: 40000
})

connection.query({
  sql: 'USE nanoleaf',
  timeout: 40000
})

connection.query({
  sql: "CREATE TABLE IF NOT EXISTS `students` ( id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, name varchar(255) NOT NULL, gender ENUM('M', 'F', 'X'), DOB date, specialized varchar(255)) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
  timeout: 40000
})
module.exports = connection;