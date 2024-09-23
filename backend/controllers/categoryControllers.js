const CategoryModel = require("../models/CategoryModel");

// get all categories
const getCategories = async (req, res) => {
  const categories = await CategoryModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(categories);
};

// get a single category
const getCategory = async (req, res) => {
  const { id } = req.params; //grab id from params (url)
  try {
    const category = await CategoryModel.findById(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// create a new category
const createCategory = async (req, res) => {
  try {
    const category = await CategoryModel.create(req.body);
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a category
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const deletedCategory = await CategoryModel.findByIdAndDelete(id); // This deletes the category
  if (!deletedCategory) {
    // alternate of try-catch
    return res.status(404).json({ error: "Category not found" });
  }
  res.status(200).json({ message: "ITEM DELETED!", category: deletedCategory });
};

// update a category
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndUpdate({ _id: id },{...req.body})
    if(!category) {
        res.status(400).json({error:"Category not found"});
    }
    res.status(200).json(category);
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
};
