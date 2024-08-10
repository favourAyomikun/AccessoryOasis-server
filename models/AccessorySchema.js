const mongoose = require('mongoose');

// cretaed a schema for accessory data
const accessorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        image_url: { type: String, required: true }
    }
)

const accessoryModel = mongoose.model('AccessoryData', accessorySchema);

module.exports = accessoryModel;