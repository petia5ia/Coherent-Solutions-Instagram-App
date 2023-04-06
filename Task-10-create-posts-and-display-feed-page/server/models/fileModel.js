//Calling the "mongoose" package
const mongoose = require("mongoose");

//Creating a Schema for uploaded files
const fileSchema = new mongoose.Schema({
    author: String,  
    createdAt: {
      type: Date,
      default: Date.now,
    },
    description: String,
    name: {
      type: String,
      required: [true, "Uploaded file must have a name"],
    },
    path: String
});

//Creating a Model from that Schema
const File = mongoose.model("File", fileSchema);

//Exporting the Model to use it in app.js File.
module.exports = File;