const express = require('express')
const router = express.Router()
const accessoryModel = require("../models/AccessorySchema");
const accessorriesData = require('../data/AccessoryData');

// route to store the data in the database

// using the post method to store data in the database
router.post('/populate', async(req, res) => {
    try {
        const result = await accessoryModel.insertMany(accessorriesData)
        console.log(result)
        res.status(200).json(result)
    } catch (err) {
        res.status(500).send('Server error')
    }
})

// using the get method to get data from the database
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