const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Handbags", "Clutches", "Totes"],
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  images: [String],
  color: String,
  ratings: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: String,
    },
  ],
  // Updated field
  averageRating: {
    type: Number,  // Automatically handles float numbers
    default: 0,
    min: 0,        // Ensure it's out of 5
    max: 5,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  description: { type: String, required: true }, // Add this line
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);