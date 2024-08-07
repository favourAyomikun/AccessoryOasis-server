const mongoose = require('mongoose')

const accessorySchema = new mongoose.Schema(
    {
        name: String,
        price: Number,
        category: String,
        image_url: String
    }
)

const accessoryModel = mongoose.model('AccessorySchema', accessorySchema);

module.exports = accessoryModel;