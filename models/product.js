const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"]
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be positive"]
  },
  stock: {
    type: Number,
    required: [true, "Stock is required"],
    min: [0, "Stock cannot be negative"]
  },
  category: {
    type: String
  },
  imageUrl: {
    type: String
  }
}, { timestamps: true });
const Product = mongoose.model("Product", productSchema);
module.exports = Product;

