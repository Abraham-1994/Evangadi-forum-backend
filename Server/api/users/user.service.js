const pool = require("../../Config/dbConfig");
// Function to register a new user
const register = (data, callback) => {
  pool.query(
    `INSERT INTO registration (user_name, user_email, user_password)
     VALUES (?, ?, ?)`,
    [data.userName, data.email, data.password],
    (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

// Function to get all users
const getAllUsers = (callback) => {
  pool.query(`SELECT * FROM registration`, [], (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  });
};

// Function to get a user by email
const getUserByEmail = (email, callback) => {
  pool.query(
    `SELECT * FROM registration WHERE user_email = ?`,
    [email],
    (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results[0]);
    }
  );
};
// Function to get a user by ID
const userById = (id, callback) => {
  pool.query(
    `SELECT * FROM registration WHERE user_id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results[0]);
    }
  );
};
// Function to create a profile for a user
const profile = (data, callback) => {
  pool.query(
    `INSERT INTO profile (user_id, first_name, last_name)
     VALUES (?, ?, ?)`,
    [data.userId, data.firstName, data.lastName],
    (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};
module.exports = {
  register,
  getAllUsers,
  getUserByEmail,
  userById,
  profile,
};
