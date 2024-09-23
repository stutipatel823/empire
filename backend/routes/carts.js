const express = require("express");
const router = express.Router();
const {
  getCarts,
  getCart,
  createCart,
  deleteCart,
  updateCart,
} = require("../controllers/cartControllers");

// GET all carts
router.get("/", getCarts);
// GET a single cart
router.get("/:id", getCart);

// POST a new cart
router.post("/", createCart);

// DELETE a cart
router.delete("/:id", deleteCart);

// UPDATE a cart
router.patch("/:id", updateCart);

module.exports = router;
