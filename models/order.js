const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ],
  total: {
    type: Number,
    required: true,
    min: 0
  },
  customerInfo: {
    name: { type: String, required: true },
    email: { type: String },
    address: { type: String }
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
