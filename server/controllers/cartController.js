const CartItem = require("../models/cartSchema");
const User = require("../models/userSchema");
const Course = require("../models/courseSchema");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Add To Cart Controller
exports.addToCart = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user._id;

    // Check if the user already has the course in their cart
    const userr = await User.findById(userId).populate("cart");
    if (!userr) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if the course with courseId is already in the user's playlist
    const courseAlreadyInPlaylist = userr.playlist.some((playlistItem) =>
      playlistItem.equals(courseId)
    );

    if (courseAlreadyInPlaylist) {
      return res.json({ message: "Course is already purchased" });
    }
    // Check if the course with courseId is already in the user's cart
    const courseAlreadyInCart = userr.cart.some((cartItem) =>
      cartItem.course.equals(courseId)
    );

    if (courseAlreadyInCart) {
      return res.json({ message: "Course already in cart" });
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newCartItem = new CartItem({
      course: course._id,
    });

    await newCartItem.save();
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { cart: newCartItem._id } },
      { new: true }
    );

    res.status(200).json({ message: "Product added to cart", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding product to cart" });
  }
};

// Fetch Cart Items Controller
exports.fetchCartItems = async (req, res) => {
  try {
    const requestedUserId = req.user._id;
    const user = await User.findById(requestedUserId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const cartItems = await CartItem.find({
      _id: { $in: user.cart },
    }).populate({
      path: 'course',
      populate: [
        { path: 'category' },
        { path: 'creator' }
      ]
    });
    const updatedCartItems = cartItems.filter((cartItem) => cartItem.course);
    user.cart = updatedCartItems.map((cartItem) => cartItem._id);
    await user.save();

    res.status(200).json({ cartItems: updatedCartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cart items" });
  }
};

// Remove Cart Items Controller
exports.removeCartItem = async (req, res) => {
  try {
    const cartItemId = req.params.cartItemId;

    // Delete the cart item
    await CartItem.findByIdAndDelete(cartItemId);

    // Remove the cart item from the user's cart array in the User model
    const userId = req.user._id; // Assuming you're using authentication middleware
    await User.findByIdAndUpdate(userId, {
      $pull: { cart: cartItemId },
    });

    res.status(200).json({ message: "Cart item removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing cart item" });
  }
};

// Update Cart Item Controller
exports.updatedCartItem = async (req, res) => {
  const { cartItemId } = req.params;
  const { newQuantity, newSize } = req.body;

  try {
    const updatedCartItem = await CartItem.findByIdAndUpdate(
      cartItemId,
      { quantity: newQuantity, size: newSize },
      { new: true }
    );
    res.json(updatedCartItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating cart item", error });
  }
};
// Remove All Cart Items Controller
exports.removeAllCartItems = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you're using authentication middleware

    // Find the user by ID and set their cart array to an empty array
    const user = await User.findByIdAndUpdate(userId, { cart: [] });

    // Delete all cart items associated with the user
    await CartItem.deleteMany({ _id: { $in: user.cart } });

    res.status(200).json({ message: "All cart items removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing all cart items" });
  }
};


exports.checkout = async (req, res) => {
  try {
    const totalPrice = await Promise.all(req.body.cartItems.map(async (item) => {
      const course = await Course.findById(item.course._id);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      const price = course.discounted_price;
      return price;
    })).then(prices => prices.reduce((acc, price) => acc + price, 0));


    const lineItems = req.body.cartItems.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.course.course_name,
          description: item.course.description,
          images: [item.course.image],
        },
        unit_amount: item.course.discounted_price * 100, // Convert price to paisa
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: "http://localhost:2000/success",
      cancel_url: "http://localhost:2000/cancel",
    });


    // Send the session URL to the client
    res.json({ url: session.url });

  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ error: "An error occurred during checkout" });
  }
};
exports.fetchPaymentHistory = async (req, res) => {
  try {
    // Retrieve payment intents or charges based on your requirements
    const paymentHistory = await stripe.paymentIntents.list({
      expand: ['data.payment_method'], // Include payment method information
    });

    // You can similarly use stripe.charges.list() if you're using charges instead of payment intents

    res.status(200).json({ paymentHistory });
  } catch (error) {
    console.error("Error fetching payment history:", error);
    res.status(500).json({ error: "An error occurred while fetching payment history" });
  }
};