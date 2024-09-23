const mongoose = require('mongoose');
const CartModel = require("../models/CartModel");
// const ProductModel = require("../models/ProductModel");
// get all carts
const getCarts = async (req, res) => {
  const carts = await CartModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(carts);
};

// get a single cart
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
    let { user, cartItems } = req.body;

    // Validate user ID
    if (!user) return res.status(400).json({ error: 'User ID is required' });

    if (cartItems) {
      cartItems = cartItems.map(item => ({
        product: item.product,
        quantity: item.quantity || 1, // Default quantity to 1 if not provided
      }));
    } else {
      cartItems = []; // Initialize as empty if not provided
    }

    const newCart = await CartModel.create({ user, cartItems });
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete a cart
const deleteCart = async (req, res) => {
  const { id } = req.params;
  const deletedCart = await CartModel.findByIdAndDelete(id); // This deletes the cart
  if (!deletedCart) {
    // alternate of try-catch
    return res.status(404).json({ error: "Cart not found" });
  }
  res.status(200).json({ message: "ITEM DELETED!", cart: deletedCart });
};

// update a cart
const updateCart = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const cart = await CartModel.findById(id);
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    // Validate and update user ID if provided and valid
    if (updates.user && mongoose.Types.ObjectId.isValid(updates.user)) {
      cart.user = updates.user;
    } else if (updates.user) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Update cart items if provided
    if (updates.cartItems) {
      cart.cartItems = updates.cartItems.map(item => ({
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

// // add an item to cart
// const addItemToCart = async (req, res) => {
//   const { id } = req.params; // Cart ID
//   const { productId, quantity } = req.body;

//   try {
//     const cart = await CartModel.findById(id);
//     if (!cart) return res.status(404).json({ error: "Cart not found" });

//     // Check if the item already exists
//     const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);
//     if (itemIndex > -1) {
//       // Update quantity if item exists
//       cart.cartItems[itemIndex].quantity = quantity;
//     } else {
//       // Add new item if it doesn't exist
//       cart.cartItems.push({ product: productId, quantity });
//     }

//     const updatedCart = await cart.save();
//     res.status(200).json(updatedCart);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // delete an item from cart
// const deleteItemFromCart = async (req, res) => {
//   const { id } = req.params; // Cart ID
//   const { productId } = req.body;

//   try {
//     const cart = await CartModel.findById(id);
//     if (!cart) return res.status(404).json({ error: "Cart not found" });

//     // Find the index of the item to remove
//     const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);
//     if (itemIndex === -1) return res.status(404).json({ error: "Item not found in cart" });

//     // Remove the item from the array
//     cart.cartItems.splice(itemIndex, 1);

//     const updatedCart = await cart.save();
//     res.status(200).json(updatedCart);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



module.exports = {
  getCarts,
  getCart,
  createCart,
  deleteCart,
  updateCart,
};
