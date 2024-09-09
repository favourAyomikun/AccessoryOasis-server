const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const otpModel = require("../models/OtpSchema");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  // generate a 6-digit otp
  const otp = crypto.randomInt(100000, 999999).toString();

  // hash otp for security
  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  // save hashed otp  and email in the database
  await otpModel.create({ email, otp: hashedOtp });

  // send otp via email
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.status(500).json({ message: "Failed to send OTP" });
    }
    res.status(200).json({ message: "OTP sent successfully" });
  });
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  // hash the incoming OTP to compare with the stored one
  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  // find the OTP in the database
  const record = await otpModel.findOne({ email, otp: hashedOtp });

  if (!record) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  // OTP is valid, you can proceed with registration or other actions
  res.status(200).json({ message: "OTP verified successfully" });

  // delete the OTP record after verification
  await otpModel.deleteOne({ _id: record._id });
});

module.exports = router;
