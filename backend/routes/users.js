const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
  signupUser,
} = require("../controllers/userControllers");

// login route (sending data to server using post method)
router.post('/login',loginUser);

// signup route
router.post('/signup',signupUser);


// GET all users
router.get("/", getUsers);
// GET a single user
router.get("/:id", getUser);

// POST a new user
router.post("/", createUser);

// DELETE a user
router.delete("/:id", deleteUser);

// UPDATE a user
router.patch("/:id", updateUser);

module.exports = router;
