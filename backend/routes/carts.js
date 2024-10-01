const express = require("express");
const router = express.Router();
const {
  getCarts,
  getCart,
  createCart,
  deleteCart,
  updateCart,
  getCartbyUserId,
  addItemToCart
} = require("../controllers/cartControllers");

// require Authentication to access api endpoints
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth);

// GET a cart based on userId
router.get("/", getCartbyUserId);

// GET all carts
router.get("/admin/", getCarts);

// GET a single cart
router.get("/:id", getCart);

// POST a new cart
router.post("/", createCart);

// DELETE a cart
router.delete("/:id", deleteCart);

// UPDATE a cart
router.patch("/", updateCart);

// POST a new cart
router.post("/items", addItemToCart);


module.exports = router;
