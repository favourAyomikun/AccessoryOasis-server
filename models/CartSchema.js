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
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
