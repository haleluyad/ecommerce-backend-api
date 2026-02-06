const Cart = require("../models/cart");
const Product = require("../models/product");

// GET /cart - view current cart
const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find().populate("productId");
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// POST /cart - add item to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity == null) {
      return res.status(400).json({ message: "Product ID and quantity are required" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (quantity > product.stock) return res.status(400).json({ message: "Not enough stock" });

    const existingCartItem = await Cart.findOne({ productId });
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.json(existingCartItem);
    }

    const cartItem = new Cart({ productId, quantity });
    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PUT /cart - update cart item quantity
const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || quantity == null) {
      return res.status(400).json({ message: "Product ID and quantity are required" });
    }

    const cartItem = await Cart.findOne({ productId });
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (quantity > product.stock) return res.status(400).json({ message: "Not enough stock" });

    cartItem.quantity = quantity;
    await cartItem.save();
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE /cart/:productId - remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedItem = await Cart.findOneAndDelete({ productId });
    if (!deletedItem) return res.status(404).json({ message: "Cart item not found" });
    res.json({ message: "Cart item removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCart,
  removeFromCart
};
