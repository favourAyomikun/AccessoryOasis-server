const { default: mongoose } = require("mongoose");

// created a schema for registration of users
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
