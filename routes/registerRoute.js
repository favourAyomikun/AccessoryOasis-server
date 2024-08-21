const express = require('express')
const userModel = require('../models/RegisterSchema')
const jwt = require('jsonwebtoken');
const router = express.Router()

router.post('/register', async (req, res) => {
    // destructure user details
    const { username, email, password } = req.body

    try {
        // check if user exists
        let user = await userModel.findOne({ email })
        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        }

        // create new user
        user = new userModel({
            username, 
            email,
            password
        })

        // save user to the database
        await user.save()

        // create jwt payload
        const payload = { user: { id: user.id } }
        
        // sign jwt token
        jwt.sign(payload,
            'accessoryoasis_ecommerce',
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token })
            }
        )
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router;