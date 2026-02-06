const Product = require("../models/product");
const getAllProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Invalid product ID", error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, imageUrl } = req.body;

    // Basic validation
    if (!name || price == null || stock == null) {
      return res.status(400).json({ message: "Name, price, and stock are required" });
    }
    if (price < 0 || stock < 0) {
      return res.status(400).json({ message: "Price and stock must be positive" });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      imageUrl
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: "Invalid data or ID", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid product ID", error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
