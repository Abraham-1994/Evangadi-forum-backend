const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Database connected!");
  connection.release();
});

const tables = {
  registration: `CREATE TABLE if not exists registration(
    user_id int auto_increment,
    user_name varchar(255) not null,
    user_email varchar(255) not null,
    user_password varchar(255) not null,
    PRIMARY KEY (user_id),
    UNIQUE KEY (user_name)
  )`,
  profile: `CREATE TABLE if not exists profile(
    user_profile_id int auto_increment,
    user_id int not null,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    PRIMARY KEY (user_profile_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id)
  )`,

  question: `CREATE TABLE if not exists question(
    question_id int auto_increment,
    question varchar(500) not null,
    question_description varchar(255) not null,
    question_code_block varchar(255),
    tags varchar(255),
    user_id int not null,
    PRIMARY KEY (question_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id)
  )`,

  answer: `CREATE TABLE if not exists answer(
    answer_id int auto_increment,
    answer varchar(5000) not null,
    answer_code_block varchar(255),
    user_id int not null,
    question_id int not null,
    PRIMARY KEY (answer_id),
    FOREIGN KEY (question_id) REFERENCES question(question_id)
  )`,
};
for (let table in tables) {
  pool.query(tables[table], (err, results) => {
    if (err) {
      console.error(`Error creating ${table} table:`, err);
    } else {
      console.log(`${table} table created`);
    }
  });
}
module.exports = pool;
