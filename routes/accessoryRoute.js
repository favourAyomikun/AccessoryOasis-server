const accessoryModel = require("../models/AccessorySchema");
const express = require('express')
const router = express.Router()

router.get('/accessories', async(req, res) => {
    try {
        const accessories = await accessoryModel.find();
        res.json(accessories)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

module.exports = router;