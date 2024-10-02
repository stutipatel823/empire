const mongoose = require("mongoose");
const CartModel = require("../models/CartModel");
const UserModel = require("../models/UserModel");

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

// update a cart (user add/remove items in their cart)
const updateCartItems = async (req, res) => {
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
  const { product, quantity = 1} = req.body; // set quantity to 1 if quantity not recieved, product is product's id
  // Validate product id and quantity
  if (!product) { 
    return res.status(400).json({ error: 'A valid product ID is required.' });
  }
  if (typeof quantity !== 'number') {
    return res.status(400).json({ error: 'Quantity must be a positive number.' });
  }

  try {
    const cart = await CartModel.findOneAndUpdate(
      { user: req.user._id },
      { $addToSet: { cartItems: { product, quantity } } }, // $addtoset avoids duplicates, $push allows duplicates
      { new: true } // Return the updated document
    );

    res.status(200).json(cart); // Return the updated cart
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// delete item from cart
const deleteItemFromCart = async (req, res) => {
  const { product } = req.body; // product's id

  try {
    const cart = await CartModel.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { cartItems: { product } } }, // Remove item with the specified product
      { new: true } // Return the updated document
    );

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    res.status(200).json(cart); // Return the updated cart
  } catch (error) {
    res.status(500).json({ error: error.message });
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

// create a new cart linked with the user's ID (admin functionality)
const createCart = async (req, res) => {
  const { userID, cartItems = [] } = req.body; // Destructure and default cartItems to empty array

  try {
    // Validate user ID
    if (!userID) return res.status(400).json({ error: "User ID is required" });

    // Map cartItems to ensure all items have the required structure
    const formattedCartItems = cartItems.map(({ product, quantity = 1 }) => ({
      product,
      quantity, // Default quantity to 1 if not provided
    }));

    // Create new cart
    const newCart = await CartModel.create({ user: userID, cartItems: formattedCartItems });
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// delete a cart (admin functionality)
const deleteCart = async (req, res) => {
  const { id } = req.params;
  const deletedCart = await CartModel.findByIdAndDelete(id); // This deletes the cart
  if (!deletedCart) {
    // alternate of try-catch
    return res.status(404).json({ error: "Cart not found" });
  }
  res.status(200).json({ message: "ITEM DELETED!", cart: deletedCart });
};

// update a cart (admin functionality)
const updateCart = async (req, res) => {
  const { id } = req.params;
  const { cart } = req.body;

  try {
    const existingCart = await CartModel.findById(id);
    if (!existingCart) return res.status(404).json({ error: "Cart not found" });

    // Validate user ID
    const userExists = await UserModel.findById(existingCart.user);
    if (!userExists) {
      return res.status(400).json({ error: 'User with ID does not exist' });
    }

    // Update cart items if provided
    if (cart.cartItems) {
      existingCart.cartItems = cart.cartItems.map((item) => ({
        product: item.product,
        quantity: item.quantity || 1, // Default quantity to 1 if not provided
      }));
    }

    const updatedCart = await existingCart.save();
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
  addItemToCart,
  updateCartItems,
  deleteItemFromCart,

};
