require("dotenv").config();

const express = require("express");
const cors = require("cors");
const signinRoute = require("./routes/signinRoute");
const registerRoute = require("./routes/registerRoute");
const accessoryRoute = require("./routes/accessoryRoute");
const cartRoute = require('./routes/CartRoute')
const path = require("path");

const app = express();
const port = 4000;


// serve static files
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// set up for mongoose connection
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

let db = mongoose.connection;
db.once("open", function () {
  console.log("DATABASE CONNECTED");
});

db.on("error", function (err) {
  console.error("Error connecting to MongoDB:", err);
});

app.use("/api/auth", signinRoute);
app.use('/api/auth', registerRoute)
app.use("/api/accessories", accessoryRoute);
app.use('/api', cartRoute)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
