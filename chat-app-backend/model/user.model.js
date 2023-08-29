const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 15 },
    email: { type: String, required: true, minlength: 3, maxlength: 200, unique: true },
    password: { type: String, required: true, minlength: 3, maxlength: 200 }
}, {
    timestamps: true
})
const userModel = mongoose.model('users', userSchema);
module.exports = { userModel };