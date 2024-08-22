const express = require("express");
const cartModel = require("../models/CartSchema");
const router = express.Router();

// get user's cart
router.get("/cart", async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await cartModel.findOne({ userId });
    res.json(cart ? cart.items : []);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// update user's cart
router.post("/cart", async (req, res) => {
  try {
    const userId = req.user._id;
    let cart = await cartModel.findOne({ userId });

    if (cart) {
      cart.items = req.body.items;
      await cart.save();
    } else {
      cart = new cartModel({ userId, items: req.body.items });
      await cart.save();
    }

    res.json({ message: 'Cart updated successfully', cart: cart.items })
  } catch (err) {
    res.status(500).json({ error: "Failed to update cart" });
  }
});

// remove item from user's cart
router.delete("/cart/:itemId", async (req, res) => {
  try {
    const userId = req.user._id;
    const itemId = req.params.itemId;

    let cart = await cartModel.findOne({ userId });

    if (cart) {
      cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
      await cart.save();
      res.json({ message: "Item removed successfully", cart: cart.items });
    } else {
      res.status(404).json({ error: "Cart not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
});


module.exports = router;