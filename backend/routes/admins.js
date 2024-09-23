const express = require("express");
const router = express.Router();
const {
  getAdmins,
  getAdmin,
  createAdmin,
  deleteAdmin,
  updateAdmin,
} = require("../controllers/adminControllers");

// GET all Admins
router.get("/", getAdmins);
// GET a single Admin
router.get("/:id", getAdmin);

// POST a new Admin
router.post("/", createAdmin);

// DELETE a Admin
router.delete("/:id", deleteAdmin);

// UPDATE a Admin
router.patch("/:id", updateAdmin);

module.exports = router;
