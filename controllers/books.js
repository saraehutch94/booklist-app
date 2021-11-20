// Require dependencies

const express = require("express");

// Create a route object

const booksRouter = express.Router();

const Book = require("../models/book");

 // List our router actions

// Seed route

booksRouter.get("/seed", async (req, res) => {
    const data = [
        {
            title: "The Art of War",
            author: "Sun Tzu"
        },
        {
            title: "How to Win Friends and Influence People",
            author: "Dale Carnegie"
        },
        {
            title: "Rich Dad Poor Dad",
            author: "Robert Kiyosaki"
        }
    ]
    await Book.deleteMany() // --> will destroy all documents in database
    await Book.create(data);
    res.redirect("/books");
    // await Book.create(data, () => {
    // res.redirect("/books");
    // });
});

// index route
booksRouter.get("/", (req, res) => {
    Book.find({}, (error, books) => {
        res.render("index.ejs", {books});
    })
});

// new route
booksRouter.get("/new", (req, res) => {
    res.render("new.ejs");
});

// delete route

booksRouter.delete("/:id", (req, res) => {
    Book.findByIdAndRemove(req.params.id, (error, data) => {
        res.redirect("/books");
    });
});

// update route

booksRouter.put("/:id", (req, res) => {
    if (req.body.completed === "on") {
        req.body.completed = true;
    } else {
        req.body.completed = false;
    }

    // another way to write the logic above:
    // req.body.completed = !!req.body.completed; --> !!"on" === true || !!undefined === false
    
    Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (error, updatedBook) => {
            res.redirect(`/books/${req.params.id}`);
            // redirect to index page: res.redirect("/books");
        }
    )
});

// create route

booksRouter.post("/", (req, res) => {
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

// edit route

booksRouter.get("/:id/edit", (req, res) => {
    Book.findById(req.params.id, (error, foundBook) => {
        res.render("edit.ejs", {foundBook});
    });
});


// show route
booksRouter.get("/:id", (req, res) => {
    Book.findById(req.params.id, (err, foundBook) => {
        res.render("show.ejs", {foundBook});
    });
});


 // Export router object so that we can require it in server.js

module.exports = booksRouter;
