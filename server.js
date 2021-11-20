// Require dependencies

const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const booksController = require("./controllers/books");

// Initialize application

const app = express();

// Configure application settings

// Set up port value

require("dotenv").config();

const PORT = process.env.PORT;

// Database connection

// capitalize constant variables
const DATABASE_URL= process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL);

// Database Connection Error/Success
// Define callback functions for various events

const db = mongoose.connection;

db.on("error", (err) => {
    console.log(err.message + " is mongo not running?");
});

db.on("connected", () => {
    console.log("mongoDB connected");
});

db.on("disconnected", () => {
    console.log('mongoDB disconnected');
});

// Mount middleware

// body-parser: grabs form information
app.use(express.urlencoded ({ extended: false }));

// make public assets available
app.use(express.static("public"));

// method-overriding
app.use(methodOverride("_method"));

// mount routes
// router middleware is always brought into scope after the regular middleware
// "/books" --> sets base route, now can take out "books" in each route in books.js
app.use("/books", booksController);

// Tell app to listen for client/browser request

app.listen(PORT, () => {
    console.log("Express is listening for browser requests on port " + PORT);
});
