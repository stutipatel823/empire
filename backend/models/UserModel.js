const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new Schema(
  {
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
      ref: "Wishlist",
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
  },
  { timestamps: true }
);

// static signup method
UserSchema.statics.signup = async function (name, email, password) {
  if (!name || !email || !password) throw Error("All fields must be filled");

  // valid email
  if (!validator.isEmail(email)) throw Error("Email is not valid");

  // strong password
  if (!validator.isStrongPassword(password))
    throw Error("Password must be strong");

  const exists = await this.findOne({ email });

  if (exists) throw Error("Email already in use");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, password: hash });
  return user;
};

// static login method
UserSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error("All fields must be filled");

  const user = await this.findOne({ email });
  if (!user) throw Error("Incorrect email");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw Error("Incorrect password");
  return user;
};
module.exports = mongoose.model("User", UserSchema);
