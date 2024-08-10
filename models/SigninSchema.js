const { default: mongoose } = require("mongoose");

// created a schema for signin
const signinSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    }
)

const signinModel = mongoose.model('SigninSchema', signinSchema)

module.exports = signinModel;