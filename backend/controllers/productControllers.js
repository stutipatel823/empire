const ProductModel = require("../models/ProductModel");

// get all products
const getProducts = async (req, res) => {
  const products = await ProductModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(products);
};

// get a single product
const getProduct = async (req, res) => {
  const { id } = req.params; //grab id from params (url)
  try {
    const product = await ProductModel.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// create a new product
const createProduct = async (req, res) => {
  try {
    const product = await ProductModel.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await ProductModel.findByIdAndDelete(id); // This deletes the product
  if (!deletedProduct) {
    // alternate of try-catch
    return res.status(404).json({ error: "Product not found" });
  }
  res.status(200).json({ message: "ITEM DELETED!", product: deletedProduct });
};

// update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.findByIdAndUpdate({ _id: id },{...req.body})
    if(!product) {
        res.status(400).json({error:"Product not found"});
    }
    res.status(200).json(product);
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
