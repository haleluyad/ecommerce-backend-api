const Order = require("../models/order");
const Cart = require("../models/cart");
const Product = require("../models/product");

// POST /orders - create an order from cart
const createOrder = async (req, res) => {
  try {
    const cartItems = await Cart.find();

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;
    const items = [];

    for (const item of cartItems) {
      const product = await Product.findById(item.productId);
      if (!product) return res.status(404).json({ message: "Product not found" });
      if (item.quantity > product.stock) return res.status(400).json({ message: `Not enough stock for ${product.name}` });

      product.stock -= item.quantity;
      await product.save();

      items.push({ productId: product._id, quantity: item.quantity });
      total += product.price * item.quantity;
    }

    const order = new Order({
      items,
      total,
      customerInfo: req.body.customerInfo
    });

    await order.save();
    await Cart.deleteMany(); // clear cart after order

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /orders - list all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.productId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /orders/:id - get order details
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.productId");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: "Invalid order ID", error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById
};
