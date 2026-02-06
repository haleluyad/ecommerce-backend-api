const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// GET /cart - view cart
router.get("/", cartController.getCart);

// POST /cart - add item to cart
router.post("/", cartController.addToCart);

// PUT /cart - update cart item
router.put("/", cartController.updateCart);

// DELETE /cart/:productId - remove item from cart
router.delete("/:productId", cartController.removeFromCart);

module.exports = router;
