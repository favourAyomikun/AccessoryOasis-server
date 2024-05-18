const argon2 = require('argon2')
const express = require('express')
const validator = require('validator');
const jwt = require('jsonwebtoken')
const signinModel = require('../models/SigninSchema')
const router = express.Router()


const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
 }

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if(!email || !validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  if(!password || password.length < 4) { 
    return res.status(400).json({ error: 'Password must be more than four characters' })
   }

  try {
    const existingUser = await signinModel.findOne({ email })
    if(existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const hashedPassword = await argon2.hash(password, { type: argon2.argon2d });

    const newUser = new signinModel({ email,  password: hashedPassword})
    await newUser.save();

    const token = generateToken(newUser)
    
    res.status(201).json({ message: 'User registered successfuly', token })
    console.log(token)
  } catch (err) { 
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Internal server error' })
  }
})


module.exports = router;