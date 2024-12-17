const WishlistModel = require("../models/WishlistModel");

// get a wishlist based on userId (from req.user._id)
const getWishlistbyUserId = async (req, res) => {
  try {
    const wishlist = await WishlistModel.findOne({ user: req.user._id });
    if (!wishlist) return res.status(404).json({ error: "wishlist not found" });
    res.json(wishlist);
  } catch (error) {
    res.status(500).json(wishlist);
  }
};

const addItemToWishlist = async (req, res) => {
  const { product } = req.body; // product's id

  // Validate product's id
  if (!product) {
    return res.status(400).json({ error: "A valid product ID is required." });
  }

  try {
    const wishlist = await WishlistModel.findOneAndUpdate(
      { user: req.user._id },
      { $addToSet: { wishlistItems: { product } } }, // Add an object
      { new: true } // Return the updated document
    );

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete item from wishlist
const deleteItemFromWishlist = async (req, res) => {
  const { product } = req.body;
  if (!product) {
    return res.status(400).json({ error: "A valid product ID is required" });
  }
  try {
    const wishlist = await WishlistModel.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { wishlistItems: { product } } },
      { new: true }
    );
    return res.status(200).json(wishlist);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// update a wishlist (user updates items in their wishlist)
const updateWishlistItems = async (req, res) => {
  const { wishlistItems } = req.body;

  try {
    const wishlist = await WishlistModel.findOne({ user: req.user._id }); // req.user is sent by middleware requireAuth
    if (!wishlist) return res.status(404).json({ error: "Wishlist not found" });

    // Update cart items if provided
    if (wishlistItems) {
      wishlist.wishlistItems = wishlistItems.map((item) => ({
        product: item.product,
      }));
    }

    const updatedWishlist = await wishlist.save();
    res.status(200).json(updatedWishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// get all wishlists (admin functionality)
const getWishlists = async (req, res) => {
  const wishlists = await WishlistModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(wishlists);
};

// get a single wishlist (admin functionality)
const getWishlist = async (req, res) => {
  const { id } = req.params; //grab id from params (url)
  try {
    const wishlist = await WishlistModel.findById(id);
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// create a new wishlist (admin functionality)
const createWishlist = async (req, res) => {
  const {userID, wishlistItems=[]} = req.body;
  try {
    if(!userID) return res.status(400).json({error: "User ID is required"});

    // Map wishlistItems to ensure all items have the required structure
    const formattedWishListItems = wishlistItems.map(({ product}) => ({
      product
    }));

    // Create new wishlist
    const newWishlist = await WishlistModel.create({ user: userID, wishlistItems: formattedWishListItems });
    res.status(201).json(newWishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete a wishlist (admin functionality)
const deleteWishlist = async (req, res) => {
  const { id } = req.params;
  const deletedWishlist = await WishlistModel.findByIdAndDelete(id); // This deletes the wishlist
  if (!deletedWishlist) {
    // alternate of try-catch
    return res.status(404).json({ error: "Wishlist not found" });
  }
  res.status(200).json({ message: "ITEM DELETED!", wishlist: deletedWishlist });
};

// update a wishlist (admin functionality)
const updateWishlist = async (req, res) => {
  const { id } = req.params;
  const wishlist = await WishlistModel.findByIdAndUpdate(
    { _id: id },
    { ...req.body }
  );
  if (!wishlist) {
    res.status(400).json({ error: "Wishlist not found" });
  }
  res.status(200).json(wishlist);
};

module.exports = {
  getWishlistbyUserId,
  addItemToWishlist,
  deleteItemFromWishlist,
  updateWishlistItems,
  getWishlists, //(admin functionality)
  getWishlist, //(admin functionality)
  createWishlist, //(admin functionality)
  deleteWishlist, //(admin functionality)
  updateWishlist, //(admin functionality)
};
