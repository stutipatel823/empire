require("dotenv").config(); // Load environment variables

const mongoose = require('mongoose');
const UserModel = require('./models/UserModel'); // Adjust path as necessary
const ProductModel = require('./models/ProductModel'); // Adjust path as necessary
const CartModel = require('./models/CartModel'); // Adjust path as necessary
const AdminModel = require('./models/AdminModel'); // Adjust path as necessary
const WishlistModel = require('./models/WishlistModel'); // Adjust path as necessary

// Sample user data
const users = [
    { name: 'Alice', email: 'alice@example.com', password: 'password123' },
    { name: 'Bob', email: 'bob@example.com', password: 'password123' },
    { name: 'Charlie', email: 'charlie@example.com', password: 'password123' },
    { name: 'David', email: 'david@example.com', password: 'password123' },
    { name: 'Eve', email: 'eve@example.com', password: 'password123' }
];

// Sample product data
const products = [
    { name: 'Chanel Classic Flap Bag', brand: 'Chanel', category: 'Handbags', price: 9999, stock: 1 },
    { name: 'Hermès Kelly Bag', brand: 'Hermès', category: 'Handbags', price: 8000, stock: 2 },
    { name: 'Prada Saffiano Leather Tote', brand: 'Prada', category: 'Totes', price: 2200, stock: 3 },
    { name: 'Louis Vuitton Neverfull MM', brand: 'Louis Vuitton', category: 'Totes', price: 1500, stock: 8 },
    { name: 'Gucci Marmont Mini Bag', brand: 'Gucci', category: 'Clutches', price: 1200, stock: 5 }
];

// Sample admin data
const admins = [
    { name: 'Admin1', email: 'admin1@example.com', password: 'admin123' },
    { name: 'Admin2', email: 'admin2@example.com', password: 'admin123' }
];

// Function to create users, products, admins, carts, and wishlists
const createData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Create users and associated carts and wishlists
    for (const user of users) {
      const newUser = await UserModel.create(user);

      // Create an empty cart for each user
      const newCart = await CartModel.create({ user: newUser._id, cartItems: [] });

      // Create an empty wishlist for each user
      const newWishlist = await WishlistModel.create({ user: newUser._id, items: [] });

      console.log(`User ${newUser.name}, cart, and wishlist created successfully.`);
    }

    // Insert products
    await ProductModel.insertMany(products);
    console.log('Products inserted successfully!');

    // Create admins
    await AdminModel.insertMany(admins);
    console.log('Admins inserted successfully!');

  } catch (error) {
    console.error('Error creating data:', error);
  } finally {
    // Close the connection
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the function to create data
createData();
