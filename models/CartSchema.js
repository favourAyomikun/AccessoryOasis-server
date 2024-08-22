const mongoose = require("mongoose");

// created a schema for cart that stores userId and cart items
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Accessory",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
    },
  ],
});

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
