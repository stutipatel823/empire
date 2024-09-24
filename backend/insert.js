require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/UserModel"); // User model
const Product = require("./models/ProductModel"); // Product model
const Cart = require("./models/CartModel"); // Cart model
const Wishlist = require("./models/WishlistModel"); // Wishlist model
const productsData = require("./data/products.json");
const usersData = require("./data/users.json");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to the database.");

    // Insert product data
    await Product.insertMany(productsData);
    console.log("Product data inserted.");

    // Create users and their associated carts and wishlists
    for (const userData of usersData) {
      const user = new User(userData); // Create a new user instance
      const savedUser = await user.save();

      // Create a cart for the new user
      const cart = new Cart({ user: savedUser._id });
      await cart.save();

      // Create a wishlist for the user
      const wishlist = new Wishlist({ user: savedUser._id });
      await wishlist.save();

      // Update the user with the cart and wishlist IDs
      savedUser.cart = cart._id;
      savedUser.wishlist = wishlist._id;
      await savedUser.save();
    }
    console.log("Users and their associated carts and wishlists created.");

    // Fetch all products
    const getProducts = await Product.find();

    // Function to generate a random integer between min and max (inclusive)
    const getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // Fetch and log all carts
    const carts = await Cart.find();
    console.log("Carts:", carts); // Log the array of cart documents

    // Log a random number of products for each cart
    for (const cart of carts) {
      const randomNum = getRandomInt(1, 6); // Generate a random number between 1 and 6
      console.log(`Cart ID: ${cart._id}, Random Number: ${randomNum}`);

      // Add random products to the cart
      for (let i = 0; i < randomNum; i++) {
        cart.cartItems.push({
          product: getProducts[i]._id,
          quantity: getRandomInt(1,9),
        }); // Add the product to the cart
      }

      // Save the updated cart
      await cart.save();
    }
    console.log("Carts updated with random products.");

    // Fetch and log all wishlists
    const wishlists = await Wishlist.find();
    console.log("Wishlists:", wishlists); // Log the array of wishlist documents

    // Log a random number of products for each wishlist
    for (const wishlist of wishlists) {
      const randomNum = getRandomInt(1, 6); // Generate a random number between 1 and 6
      console.log(`Wishlist ID: ${wishlist._id}, Random Number: ${randomNum}`);

      // Add random products to the wishlist
      for (let i = 0; i < randomNum; i++) {
        wishlist.wishlistItems.push({
          product: getProducts[i]._id,
        }); // Add the product to the wishlist
      }

      // Save the updated wishlist
      await wishlist.save();
    }
    console.log("Wishlists updated with random products.");

    console.log("All data inserted successfully.");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
