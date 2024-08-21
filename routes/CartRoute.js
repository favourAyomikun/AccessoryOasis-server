const express = require('express');
const cartModel = require("../models/CartSchema")
const router = express.Router();

// get user's cart
router.get('/cart', async (req, res) => {
    try {
        const userId = req.user._id
        const cart = await cartModel.findOne({ userId })
        res.json(cart ? cart.items : [])
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch cart'})
    }
})

// update user's cart
router.post('/cart', async (req, res) => {
    try {
        const userId = req.user._id
        let cart = await cartModel.findOne({ userId })

        if (cart) {
            cart.items = req.body.items
            await cart.save();
        } else {
            cart = new cartModel({ userId, items: req.body.items })
            await cart.save()
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to update cart' });
    }
})


module.exports = router;