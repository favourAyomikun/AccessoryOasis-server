const mongoose = require("mongoose");

// created a schema for cart that stores userId and cart items
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
      // The validator function checks if a user with the given ObjectId exists in the User collection.
    validate: {
      validator: async function (value) {
        const userExists = await mongoose.model('User').exists({ _id: value })
        return userExists;
      },
      message: 'User not found'
    }
  },
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AccessoryData",
        required: true,
        // The validator function checks if an accessory with the given ObjectId exists in the AccessoryData collection.
        validate: {
          validator: async function (value) {
            const accessoryExists = await mongoose
              .model("AccessoryData")
              .exists({ _id: value });
            return accessoryExists; 
          },
          message: (props) => `Accessory with ID ${props.value} not found`, 
        },
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      },
    },
  ],
});

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
