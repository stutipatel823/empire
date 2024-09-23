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
  averageRating:{
    type:Number,
    default:0,
  },
  numReviews:{
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);

