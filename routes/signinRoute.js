const express = require("express");
const jwt = require("jsonwebtoken");
const argon2d = require("argon2");
const userModel = require("../models/UserSchema");
const router = express.Router();

// function to generate jwt token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// route to authenticate/log in users
router.post("/login", async (req, res) => {
  // destructured email & password from the request body
  const { email, password } = req.body;

  try {
    // check if the user's email exists in the database already
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found in the database" });
    }

    // verify the provided password with the hashed password in the database
    const passwordMatch = await argon2d.verify(existingUser.password, password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token for the authenticated user
    const token = generateToken(existingUser);
    console.log("Generated JWT Token:", token);

    // Decode the token to check the payload directly on the backend
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token Payload:", decodedToken);
    
    // send response with token, user data and success message
    res.status(200).json({
      user: {
        id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
      },
      token,
      message: "Login successful",
    });
    console.log(token);
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
