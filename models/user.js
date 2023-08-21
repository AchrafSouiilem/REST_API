const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name: {type: String, require: true}
}) 

const User = mongoose.model("Users", userSchema)

module.exports = User
