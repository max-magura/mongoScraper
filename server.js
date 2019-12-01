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

mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });






app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});