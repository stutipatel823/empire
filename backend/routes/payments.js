const express = require("express");
const router = express.Router();
const {
  getPayments,
  getPayment,
  createPayment,
  deletePayment,
  updatePayment,
} = require("../controllers/paymentControllers");
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth);
// GET all carts
router.get("/", getPayments);
// GET a single cart
router.get("/:id", getPayment);

// POST a new cart
router.post("/", createPayment);

// DELETE a cart
router.delete("/:id", deletePayment);

// UPDATE a cart
router.patch("/:id", updatePayment);

module.exports = router;
