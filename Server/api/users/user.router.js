const router = require("express").Router();
const {
  createUser,
  getUsers,
  getUserById,
  login,
} = require("./user.controller");
const auth = require("../middleware/auth");
// Route to create a new user
router.post("/", createUser);
// Route to get all users
router.get("/all", getUsers);
// Route to get user by ID, with authentication
router.get("/:id", auth, getUserById);
// Route to login
router.post("/login", login);
module.exports = router;
