// Require dependencies

const express = require("express");
const methodOverride = require("method-override");


// Initialize application

const app = express();

// Configure application settings

// Set up port value

require("dotenv").config();

const PORT = process.env.PORT;


// Mount middleware

// body-parser: grabs form information
app.use(express.urlencoded ({ extended: false }));

// make public assets available
app.use(express.static("public"));

// method-overriding
app.use(methodOverride("_method"));

// Mount routes


// Tell app to listen for client/browser request

app.listen(PORT, () => {
    console.log("Express is listening for browser requests on port " + PORT);
});
