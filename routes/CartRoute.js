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
router.post('/cart', async (req, res) => {
  const { userId, itemId, quantity } = req.body;
  
    try {
      // find the cart for the user
      let cart = await cartModel.findOne({ userId })
      
      if (cart) {
        // if cart exists, add item to the items array
        const itemIndex = cart.items.findIndex(item => item.itemId == itemId)

        if (itemIndex > -1) {
          // if item exists in the cart, update the quantity
          cart.items[itemIndex].quantity += quantity
        } else {
          // if item doesn't exist, add it
          cart.items.push({ itemId, quantity })
        }
      } else {
        // if cart doesn't exist, create a new one
        cart = new cartModel({
          userId,
          items: [{ itemId, quantity }]
        }) 
      }
  
      await cart.save();
      res.status(200).json({ message: 'Item added to cart', cart });
    } catch (error) {
      console.error('Error saving cart item:', error);
      res.status(500).json({ message: 'Internal Server Error' });
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