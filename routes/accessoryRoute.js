const express = require('express')
const router = express.Router()
const accessoryModel = require("../models/AccessorySchema");
const accessorriesData = require('../data/AccessoryData');

router.post('/populate', async(req, res) => {
    try {
        const result = await accessoryModel.insertMany(accessorriesData)
        console.log(result)
        res.status(200).json(result)
    } catch (err) {
        res.status(500).send('Server error')
    }
})

router.get('/', async(req, res) => {
    try {
        const accessorriesData = await accessoryModel.find();
        res.status(200).json(accessorriesData)
        console.log(accessorriesData)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

module.exports = router;