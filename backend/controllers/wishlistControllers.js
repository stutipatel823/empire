const WishlistModel = require("../models/WishlistModel");


// get all wishlists
const getWishlists = async (req, res) => {
  const wishlists = await WishlistModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(wishlists);
};

// get a single wishlist
const getWishlist = async (req, res) => {
  const { id } = req.params; //grab id from params (url)
  try {
    const wishlist = await WishlistModel.findById(id);
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// create a new wishlist
const createWishlist = async (req, res) => {
  try {
    const wishlist = await WishlistModel.create(req.body);
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a wishlist
const deleteWishlist = async (req, res) => {
  const { id } = req.params;
  const deletedWishlist = await WishlistModel.findByIdAndDelete(id); // This deletes the wishlist
  if (!deletedWishlist) {
    // alternate of try-catch
    return res.status(404).json({ error: "Wishlist not found" });
  }
  res.status(200).json({ message: "ITEM DELETED!", wishlist: deletedWishlist });
};

// update a wishlist
const updateWishlist = async (req, res) => {
  const { id } = req.params;
  const wishlist = await WishlistModel.findByIdAndUpdate({ _id: id },{...req.body})
    if(!wishlist) {
        res.status(400).json({error:"Wishlist not found"});
    }
    res.status(200).json(wishlist);
};

module.exports = {
  getWishlists,
  getWishlist,
  createWishlist,
  deleteWishlist,
  updateWishlist,
};
