const {
  register,
  getAllUsers,
  getUserByEmail,
  userById,
  profile,
} = require("./user.service");
const pool = require("../../Config/dbConfig");
const bcrypt = require("bcryptjs");
// const {StatusCodes} = require ('http-status-code');
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  // --------------to create users--------------- //
  createUser: (req, res) => {
    const { userName, firstName, lastName, email, password } = req.body;
    console.log(req.body);
    if (!userName || !firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ msg: "Please provide all required information!" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 8 characters!" });
    }
    pool.query(
      "SELECT * FROM registration WHERE user_email = ?",
      [email],
      (err, results) => {
        if (err) {
          return res.status(500).json({ msg: "Database connection error" });
        }
        if (results.length > 0) {
          return res.status(400).json({ msg: "User already registered!" });
        } else {
          const salt = bcrypt.genSaltSync();
          const hashedPassword = bcrypt.hashSync(password, salt);
          const userData = {
            ...req.body,
            password: hashedPassword,
          };
          register(userData, (err, registerResults) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ msg: "Database connection error" });
            }
            pool.query(
              "SELECT * FROM registration WHERE user_email = ?",
              [email],
              (err, userResults) => {
                if (err) {
                  return res
                    .status(500)
                    .json({ msg: "Database connection error" });
                }
                const userId = userResults[0].user_id;
                const profileData = { ...req.body, userId };
                profile(profileData, (err, profileResults) => {
                  if (err) {
                    console.log(err);
                    return res
                      .status(500)
                      .json({ msg: "Database connection error" });
                  }
                  return res.status(200).json({
                    msg: "New user added successfully",
                    data: profileResults,
                  });
                });
              }
            );
          });
        }
      }
    );
  },
  // --------------to get all users--------------- //
  getUsers: (req, res) => {
    getAllUsers((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Database connection error!" });
      }
      return res.status(200).json({ data: results });
    });
  },
  // --------------to get user by ID--------------- //
  getUserById: (req, res) => {
    const userId = req.params.id;
    userById(userId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Database connection error!" });
      }
      if (!results) {
        return res.status(404).json({ msg: "Record not found!" });
      }
      return res.status(200).json({ data: results });
    });
  },
  // --------------to login--------------- //
  login: (req, res) => {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Not all fields have been provided" });
    }
    getUserByEmail(email, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Database connection error" });
      }
      if (!results) {
        return res
          .status(404)
          .json({ msg: "No account with this email has been registered" });
      }
      const isMatch = bcrypt.compareSync(password, results.user_password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
      const token = jwt.sign({ id: results.user_id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.json({
        token,
        user: { id: results.user_id, display_name: results.user_name },
      });
    });
  },
};
