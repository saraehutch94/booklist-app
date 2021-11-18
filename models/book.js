// Require dependencies

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define a mongoose schema

const bookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    completed: Boolean,
}, { timestamps: true });

// Export the model to be accessed in server.js

// "Book" -> name of model
// bookSchema -> reference to schema
module.exports = mongoose.model("Book", bookSchema);
