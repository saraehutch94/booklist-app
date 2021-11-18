// Require dependencies

const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Book = require("./models/book.js");

// Initialize application

const app = express();

// Configure application settings

// Set up port value

require("dotenv").config();

const PORT = process.env.PORT;

console.log(process.env);

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

// Mount routes

// new route
app.get("/books/new", (req, res) => {
    res.send("new");
});

// create route
app.post("/books", (req, res) => {
    if (req.body.completed === "on") {
    // if checked, req.body.completed is set to "on"
    req.body.complete = true;
    } else {
    // if not checked, req.body.completed is undefined
    req.body.completed = false;
    }

    Book.create(req.body, (err, createdBook) => {
        res.send(createdBook);
    });
    res.send(req.body);
});


// Tell app to listen for client/browser request

app.listen(PORT, () => {
    console.log("Express is listening for browser requests on port " + PORT);
});
