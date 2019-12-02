var express = require("express");
var exphbs  = require('express-handlebars');
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

// var db = require("./models");
var PORT = 8081;
var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
 
app.get('/', function (req, res) {
    res.render('home');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper";
mongoose.connect(MONGODB_URI);



// STUFF HERE //




app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});