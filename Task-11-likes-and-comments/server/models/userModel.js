//Calling the "mongoose" package
const mongoose = require("mongoose");

//Creating a Schema
//The flag "strict" is set to false to enable the posibility to add a new property that isn't defined in the schema
const userSchema = new mongoose.Schema({
    avatar: String,
    email: { type: String, require: true },
    password: { type: String, require: true, minLength: 5 },
    username: { type: String, require: true, unique: true },
}, { strict: false });

//Creating a Model from that Schema
const User = mongoose.model("User", userSchema);

//Exporting the Model to use it in the app.js file
module.exports = User;