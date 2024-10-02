const express = require("express");
const router = express.Router();
const {
  getWishlistbyUserId,
  addItemToWishlist,
  deleteItemFromWishlist,
  updateWishlistItems,
  getWishlists,
  getWishlist,
  createWishlist,
  deleteWishlist,
  updateWishlist,
} = require("../controllers/wishlistControllers");
const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth);

// GET a wishlist based on user's id
router.get("/", getWishlistbyUserId);

// POST an item to user's wishlist
router.post("/", addItemToWishlist);

// DELETE an item from user's wishlist
router.delete("/", deleteItemFromWishlist);

// DELETE an user's wishlistItems
router.patch("/", updateWishlistItems);

// GET all wishlists ()
router.get("/admin", getWishlists);

// GET a single wishlist
router.get("/admin/:id", getWishlist);

// POST a new wishlist
router.post("/admin", createWishlist);

// DELETE a wishlist
router.delete("/admin/:id", deleteWishlist);

// UPDATE a wishlist
router.patch("/admin/:id", updateWishlist);

module.exports = router;
