const express = require("express");
const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware
app.use(express.json());

// Database
connectDB();

// Routes
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

// Test route (optional but helpful)
app.get("/", (req, res) => {
  res.send("API is running");
});

// Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

