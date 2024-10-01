const mongoose = require("mongoose");
const CartModel = require("../models/CartModel");
// const ProductModel = require("../models/ProductModel");

// get a cart based on userId (from req.user._id)
const getCartbyUserId = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });
    res.json(cart);
  } catch (error) {
    res.status(500).json(cart);
  }
};

// get all carts (admin functionality)
const getCarts = async (req, res) => {
  const carts = await CartModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(carts);
};

// get a single cart by cart id (admin functionality)
const getCart = async (req, res) => {
  const { id } = req.params; //grab id from params (url)
  try {
    const cart = await CartModel.findById(id);
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Create a new cart for a user
const createCart = async (req, res) => {
  try {
    let { userID, cartItems } = req.body;

    // Validate user ID
    if (!userID) return res.status(400).json({ error: "User ID is required" });

    if (cartItems) {
      cartItems = cartItems.map((item) => ({
        product: item.product,
        quantity: item.quantity || 1, // Default quantity to 1 if not provided
      }));
    } else {
      cartItems = []; // Initialize as empty if not provided
    }

    const newCart = await CartModel.create({ user: userID, cartItems });
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete a cart (only by cart owner or admin)
const deleteCart = async (req, res) => {
  const { id } = req.params;
  const deletedCart = await CartModel.findByIdAndDelete(id); // This deletes the cart
  if (!deletedCart) {
    // alternate of try-catch
    return res.status(404).json({ error: "Cart not found" });
  }
  res.status(200).json({ message: "ITEM DELETED!", cart: deletedCart });
};

// update a cart (user add/remove items in their cart)
const updateCart = async (req, res) => {
  const { cartItems } = req.body;

  try {
    const cart = await CartModel.findOne({ user: req.user._id }); // req.user is sent by middleware requireAuth
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    // Update cart items if provided
    if (cartItems) {
      cart.cartItems = cartItems.map((item) => ({
        product: item.product,
        quantity: item.quantity || 1, // Default quantity to 1 if not provided
      }));
    }

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// add item to cart
const addItemToCart = async (req, res) => {
  const { product, quantity } = req.body.cartItem; // Destructure productId and quantity from cartItem

  try {
    const cart = await CartModel.findOne({ user: req.user._id }); // Find the cart for the user
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.cartItems.push({ product: product, quantity: quantity || 1 }); // Default to 1 if not provided

    const updatedCart = await cart.save(); // Save the updated cart
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getCarts,
  getCart,
  createCart,
  deleteCart,
  updateCart,
  getCartbyUserId,
  addItemToCart, // Include the new function here

};
