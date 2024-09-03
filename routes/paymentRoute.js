const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

router.post('/', async (req, res) => {
    const { reference } = req.body

    try {
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            }
        })

        const { status, data } = response;

        if (status === 200 && data.data.status === 'success') {
            // payment was successful
            res.json({ message: 'Payment verified successfully', data: data.data })
        } else {
            res.status(400).json({ message: 'Payment verification failed', data: data.data })
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
})

module.exports = router;