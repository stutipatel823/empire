const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  phoneNumber: String,
  wishlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wishlist',
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  }],
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
  },
}, { timestamps: true });



module.exports = mongoose.model('User', UserSchema);
