const OrderModel = require("../models/OrderModel");

// get all orders
const getOrders = async (req, res) => {
  const orders = await OrderModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(orders);
};

// get a single order
const getOrder = async (req, res) => {
  const { id } = req.params; //grab id from params (url)
  try {
    const order = await OrderModel.findById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// create a new order
const createOrder = async (req, res) => {
  try {
    const order = await OrderModel.create(req.body);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a order
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const deletedOrder = await OrderModel.findByIdAndDelete(id); // This deletes the order
  if (!deletedOrder) {
    // alternate of try-catch
    return res.status(404).json({ error: "Order not found" });
  }
  res.status(200).json({ message: "ITEM DELETED!", order: deletedOrder });
};

// update a order
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const order = await OrderModel.findByIdAndUpdate({ _id: id },{...req.body})
    if(!order) {
        res.status(400).json({error:"Order not found"});
    }
    res.status(200).json(order);
};

const markOrderAsPaid = async (req, res) => {
    const { id } = req.params;
    try {
      const order = await OrderModel.findById(id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      order.isPaid = true;
      order.paidAt = new Date();
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  const markOrderAsDelivered = async (req, res) => {
    const { id } = req.params;
    try {
      const order = await OrderModel.findById(id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      order.isDelivered = true;
      order.deliveredAt = new Date();
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  
module.exports = {
  getOrders,
  getOrder,
  createOrder,
  deleteOrder,
  updateOrder,
};
