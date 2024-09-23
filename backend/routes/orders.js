const express = require("express");
const router = express.Router();
const {
  getOrders,
  getOrder,
  createOrder,
  deleteOrder,
  updateOrder,
} = require("../controllers/orderControllers");

// GET all carts
router.get("/", getOrders);
// GET a single cart
router.get("/:id", getOrder);

// POST a new cart
router.post("/", createOrder);

// DELETE a cart
router.delete("/:id", deleteOrder);

// UPDATE a cart
router.patch("/:id", updateOrder);

module.exports = router;
