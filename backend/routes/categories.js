const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryControllers");

// GET all products
router.get("/", getCategories);
// GET a single product
router.get("/:id", getCategory);

// POST a new product
router.post("/", createCategory);

// DELETE a product
router.delete("/:id", deleteCategory);

// UPDATE a product
router.patch("/:id", updateCategory);

module.exports = router;
