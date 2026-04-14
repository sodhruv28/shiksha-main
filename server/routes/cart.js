const express = require("express");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../controllers/authControllers");
const {
  addToCart,
  fetchCartItems,
  removeCartItem,
  updatedCartItem,
  removeAllCartItems,
  checkout,
  fetchPaymentHistory,
} = require("../controllers/cartController");

// Add to Cart Route
router.post("/add-to-cart/:courseId", isAuthenticated, addToCart);

// Fetch Cart Items Route
router.get("/fetch-cartItems", isAuthenticated, fetchCartItems);

// Update Cart Item Quantity Route
router.put("/update-cartItem/:cartItemId", isAuthenticated, updatedCartItem);

// Delete Cart Item Route
router.delete("/remove-cartItem/:cartItemId", isAuthenticated, removeCartItem);

router.delete("/remove-allCartItems", isAuthenticated, removeAllCartItems);

// Checkout Route
router.post("/checkout", checkout);

router.get('/history',fetchPaymentHistory)

module.exports = router;
