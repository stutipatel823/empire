const ReviewModel = require("../models/ReviewModel");

// get all reviews
const getReviews = async (req, res) => {
  const reviews = await ReviewModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(reviews);
};

// get a single review
const getReview = async (req, res) => {
  const { id } = req.params; //grab id from params (url)
  try {
    const review = await ReviewModel.findById(id);
    res.status(200).json(review);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// create a new review
const createReview = async (req, res) => {
  try {
    const review = await ReviewModel.create(req.body);
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a review
const deleteReview = async (req, res) => {
  const { id } = req.params;
  const deletedReview = await ReviewModel.findByIdAndDelete(id); // This deletes the review
  if (!deletedReview) {
    // alternate of try-catch
    return res.status(404).json({ error: "Review not found" });
  }
  res.status(200).json({ message: "ITEM DELETED!", review: deletedReview });
};

// update a review
const updateReview = async (req, res) => {
  const { id } = req.params;
  const review = await ReviewModel.findByIdAndUpdate({ _id: id },{...req.body})
    if(!review) {
        res.status(400).json({error:"Review not found"});
    }
    res.status(200).json(review);
};

module.exports = {
  getReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
};
