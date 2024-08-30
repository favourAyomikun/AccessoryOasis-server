const express = require("express");
const cartModel = require("../models/CartSchema");
const router = express.Router();

// get user's cart
router.get("/getCartItems", async (req, res) => {
  const userId = req.query.userId || req.body.userId;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    // Find the cart associated with the userId
    const cart = await cartModel.findOne({ userId }).populate('items.itemId', 'name price image_url');

     if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }

    // If a cart is found, return the items and userId, otherwise return an empty array
    res.json({
      userId: cart.userId,
      items: cart.items
    });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// update user's cart
router.post("/saveCartItems", async (req, res) => {
  const { userId, items } = req.body;

  if (!userId || !items || items.length === 0) {
    return res.status(400).json({ error: "User ID and items are required." });
  }

  try {
    // find the cart for the user
    let cart = await cartModel.findOne({ userId });

    if (cart) {
      // Iterate over items to add or update them in the cart
      items.forEach(({ itemId, quantity }) => {
        const itemIndex = cart.items.findIndex((item) => item.itemId == itemId)
        if (itemIndex >- 1) {
          cart.items[itemIndex].quantity += quantity;
        } else {
          cart.items.push({ itemId, quantity })
        }
      })
    } else {
      // if cart doesn't exist, create a new one
      cart = new cartModel({
        userId,
        items: items.map(({ itemId, quantity }) => ({ itemId, quantity })),
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
router.delete("/removeCartItem/:itemId", async (req, res) => {
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
          message: "Item deleted successfully",
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
