const express = require("express");
const router = express.Router();
const {
  getCarts,
  getCart,
  createCart,
  deleteCart,
  updateCart,
  getCartbyUserId,
  addItemToCart,
  updateCartItems,
  deleteItemFromCart,
} = require("../controllers/cartControllers");

// require Authentication to access api endpoints
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth);

// GET a cart based on user's id
router.get("/", getCartbyUserId);

// POST an item to user's cart
router.post("/", addItemToCart);

// UPDATE Items in user's cart
router.patch("/", updateCartItems);

// DELETE an item from user's cart
router.delete("/", deleteItemFromCart);

// GET all carts
router.get("/admin", getCarts);

// GET a single cart
router.get("/admin/:id", getCart);

// POST a new cart
router.post("/admin", createCart);

// DELETE a cart
router.delete("/admin/:id", deleteCart);

// UPDATE a cart
router.patch("/admin/:id", updateCart);




module.exports = router;
