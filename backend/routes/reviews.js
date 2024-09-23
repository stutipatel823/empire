const express = require("express");
const router = express.Router();
const {
  getReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
} = require("../controllers/reviewControllers");

// GET all products
router.get("/", getReviews);
// GET a single product
router.get("/:id", getReview);

// POST a new product
router.post("/", createReview);

// DELETE a product
router.delete("/:id", deleteReview);

// UPDATE a product
router.patch("/:id", updateReview);

module.exports = router;
