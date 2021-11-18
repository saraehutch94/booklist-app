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

// index route
app.get("/books", (req, res) => {
    Book.find({}, (error, books) => {
        res.render("index.ejs", {books});
    })
});

// new route
app.get("/books/new", (req, res) => {
    res.render("new.ejs");
});

// create route
app.post("/books", (req, res) => {
    if (req.body.completed === "on") {
    // if checked, req.body.completed is set to "on"
    req.body.completed = true;
    } else {
    // if not checked, req.body.completed is undefined
    req.body.completed = false;
    }

    Book.create(req.body, (err, createdBook) => {
        res.redirect("/books");
    });
});

// show route
app.get("/books/:id", (req, res) => {
    Book.findById(req.params.id, (err, foundBook) => {
        res.render("show.ejs", {foundBook});
    });
});

// Tell app to listen for client/browser request

app.listen(PORT, () => {
    console.log("Express is listening for browser requests on port " + PORT);
});
