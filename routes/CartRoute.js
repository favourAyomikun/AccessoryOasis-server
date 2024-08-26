const express = require("express");
const cartModel = require("../models/CartSchema");
const router = express.Router();

// get user's cart
router.get("/cart", async (req, res) => {
  const userId = req.query.userId || req.body.userId;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    // Find the cart associated with the userId
    const cart = await cartModel.findOne({ userId });

    // If a cart is found, return the items, otherwise return an empty array
    res.json(cart ? cart.items : []);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// update user's cart
router.post("/cart", async (req, res) => {
  const { userId, itemId, quantity } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    // find the cart for the user
    let cart = await cartModel.findOne({ userId });

    if (cart) {
      // if cart exists, add item to the items array
      const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);

      if (itemIndex > -1) {
        // if item exists in the cart, update the quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // if item doesn't exist, add it
        cart.items.push({ itemId, quantity });
      }
    } else {
      // if cart doesn't exist, create a new one
      cart = new cartModel({
        userId,
        items: [{ itemId, quantity }],
      });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error("Error saving cart item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// remove item from user's cart
router.delete("/cart/:itemId", async (req, res) => {
  const userId = req.query.userId || req.body.userId;

  // Ensure the user is authenticated
  if (!userId) {
    return res.status(400).json({ error: "User Id is required." });
  }

  try {
    const itemId = req.params.itemId;

    let cart = await cartModel.findOne({ userId });

    if (cart) {
      // Find the item in the cart
      const itemIndex = cart.items.findIndex(
        (item) => item.itemId.toString() === itemId
      );

      if (itemIndex > -1) {
        // Decrease the quantity by 1
        if (cart.items[itemIndex].quantity > 1) {
          cart.items[itemIndex].quantity -= 1;
        } else {
          // If quantity is 1, remove the item from the cart
          cart.items.splice(itemIndex, 1);
        }

        await cart.save();
        res.json({
          message: "Item quantity updated successfully",
          cart: cart.items,
        });
      } else {
        res.status(404).json({ error: "Item not found in cart" });
      }
    } else {
      res.status(404).json({ error: "Cart not found" });
    }
  } catch (err) {
    console.error("Error removing item from cart:", err);
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
});

module.exports = router;
