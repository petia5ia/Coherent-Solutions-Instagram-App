//Calling the "mongoose" package
const mongoose = require("mongoose");

//Creating a Schema for posted comments
const commentSchema = new mongoose.Schema({
    author: {
        avatar: String,
        username: String
    },
    isReply: Boolean,
    parentCommentId: String,
    postName: String,
    text: String
}, { strict: false });

//Creating a Model from that Schema
const Comment = mongoose.model("Comment", commentSchema);

//Exporting the Model to use it in the app.js file
module.exports = Comment;