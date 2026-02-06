const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product ID is required"]
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [1, "Quantity must be at least 1"]
  }
}, { timestamps: true });
const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
