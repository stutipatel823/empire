const PaymentModel = require("../models/PaymentModel");

// get all orders
const getPayments = async (req, res) => {
  const orders = await PaymentModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(orders);
};

// get a single order
const getPayment = async (req, res) => {
  const { id } = req.params; //grab id from params (url)
  try {
    const order = await PaymentModel.findById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// create a new order
const createPayment = async (req, res) => {
  try {
    const order = await PaymentModel.create(req.body);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a order
const deletePayment = async (req, res) => {
  const { id } = req.params;
  const deletedPayment = await PaymentModel.findByIdAndDelete(id); // This deletes the order
  if (!deletedPayment) {
    // alternate of try-catch
    return res.status(404).json({ error: "Payment not found" });
  }
  res.status(200).json({ message: "ITEM DELETED!", order: deletedPayment });
};

// update a order
const updatePayment = async (req, res) => {
  const { id } = req.params;
  const order = await PaymentModel.findByIdAndUpdate({ _id: id },{...req.body})
    if(!order) {
        res.status(400).json({error:"Payment not found"});
    }
    res.status(200).json(order);
};

  
  
module.exports = {
  getPayments,
  getPayment,
  createPayment,
  deletePayment,
  updatePayment,
};
