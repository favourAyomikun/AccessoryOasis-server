const express = require('express')
const router = express.Router()
const crypto = require('crypto')


router.post('/send-otp', async (req, res) => {
    const { email } = req.body;

    // generate a 6-digit otp
    const otp = crypto.randomInt(100000, 999999)

    // save otp & email in database
    const hashedOtp = crypto.createHash('sha256').update(otp.toString()).digest('hex')
    await 
})

router.post('/verify-otp', async (req, res) => {

})

module.exports = router;