const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// POST /orders - create order from cart
router.post("/", orderController.createOrder);

// GET /orders - list all orders
router.get("/", orderController.getOrders);

// GET /orders/:id - get order by ID
router.get("/:id", orderController.getOrderById);

module.exports = router;
