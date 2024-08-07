require('dotenv').config();
const mongoose = require("mongoose");
const accessoryModel = require('../models/AccessorySchema');

const accessorriesData = [
    {
        name: "Tote Bag",
        price: 79.99,
        category: "Bags",
        image_url: "/tote-bag-1.png",
    },
    {
        name: "Crossbody Bag",
        price: 149.99,
        category: "Bags",
        image_url: "/crossbody-bag-2.png",
    },
    {
        name: "HandBag",
        price: 49.99,
        category: "Bags",
        image_url: "/handbag-3.png",
    },

    {
        name: "Skydiving Sunglasses",
        price: 59.99,
        category: "Sunglasses",
        image_url: "/sunglasses-1.png",
    },
    {
        name: "Vintage Sunglasses",
        price: 39.99,
        category: "Sunglasses",
        image_url: "/vintage-sunglasses-2.png",
    },
    {
        name: "Beach Sunglasses",
        price: 40.99,
        category: "Sunglasses",
        image_url: "/sunglasses-3.png",
    },

    {
        name: "Leather Brown Wristwatch",
        price: 90.99,
        category: "Watches",
        image_url: "/brown-wristwatch.jpg",
    },
    {
        name: "Silver Pocket Watch",
        price: 150.99,
        category: "Watches",
        image_url: "/silver-pocket_watch.png",
    },
    {
        name: "Pocket WatchClock",
        price: 200.99,
        category: "Watches",
        image_url: "/pocket-watch-clock.png",
    },
];

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        return accessoryModel.insertMany(accessorriesData)
    })
    .then(() => {
        console.log('Data inserted')
        mongoose.connection.close()
    })
    .catch((err) => {
        console.error(err)
    })