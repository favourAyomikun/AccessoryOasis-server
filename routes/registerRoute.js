const express = require("express");
const userModel = require("../models/UserSchema");
const argon2d  = require("argon2");
const router = express.Router();

// route to register users
router.post("/register", async (req, res) => {
  // destructure user details from the request body
  const { username, email, password } = req.body;

  try {
    // check if user exists
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hashed password with argon
    const hashedPassword = await argon2d.hash(password);

    // create new user
    user = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    // save user to the database
    await user.save();

    // Send response with user data and success message
    res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      message: "Account created successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
