const express = require("express");
const router = express.Router();

router.get("/getUserProfile/:userId", async (req, res) => {
    try {
      const user = await userModel.findById(req.params.userId).select("-password"); // Exclude password
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  });

  
module.exports = router;