//Calling the "mongoose" package
const mongoose = require("mongoose");

//Creating a Schema for uploaded files
//The flag "strict" is set to false to enable the posibility to add a new property that isn't defined in the schema
const postSchema = new mongoose.Schema({
    author: {
        avatar: String,
        username: String
    },
    createdAt: { type: Date, default: Date.now },
    description: String,
    likes: {
        count: { type: Number, default: 0 },
        users: [String]
    },
    name: { type: String, required: [true, "Uploaded file must have a name"] },
    path: String
}, { strict: false });

//Creating a Model from that Schema
const Post = mongoose.model("Post", postSchema);

//Exporting the Model to use it in the app.js file
module.exports = Post;