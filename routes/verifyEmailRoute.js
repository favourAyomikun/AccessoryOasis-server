const express = require('express')
const router = express.Router()


router.post('/send-otp', async (req, res) => {
    const { email } = req.body;

    // generate a 6-digit otp
})

router.post('/verify-otp', async (req, res) => {

})

module.exports = router;