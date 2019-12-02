var express = require("express");
var handlebars = require("handlebars");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

// var db = require("./models");
var PORT = 8081;
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper";
mongoose.connect(MONGODB_URI);





app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});