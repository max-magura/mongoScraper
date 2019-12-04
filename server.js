var express = require("express");
var exphbs  = require('express-handlebars');
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

var db = require("./models");
var PORT = 8081;
var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
 
app.get('/', function (req, res) {
    res.render('home');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper";
mongoose.connect(MONGODB_URI);

app.get("/scrape", function(req, res) {
  console.log("yes, I'm here")
  axios.get("https://www.buzzfeednews.com/").then(function(response) {
    var $ = cheerio.load(response.data);
   
    $("article.newsblock-story-card").each(function(i, element) {
      var result = {};
    
      result.headline = $(this)
        .children("span").children("h2")
        .text().trim();
      result.url = $(this)
        .children("span").children("h2").children("a")
        .attr("href");
      result.summary = $(this)
        .children("span").children("p")
        .text();
      result.saved = false;

      db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.log(err);
        });
      console.log("HEY", result)
    });
  });
});

app.get("/articles", function(req, res) {
  db.Article.find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});



// STUFF HERE //




app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});