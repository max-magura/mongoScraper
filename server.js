var express = require("express");
var exphbs  = require('express-handlebars');
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

var db = require("./models");
var PORT = process.env.PORT || 8081;
var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
 
app.get('/', function (req, res) {
    res.render('home');
});

app.get("/savedArticles", function (req, res) {
  console.log("CLIIIICK")
  res.render("savedArticles");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper";
mongoose.connect(MONGODB_URI);

app.get("/articles", function(req, res) {
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
        })
        .catch(function(err) {
          console.log(err);
        });

      db.Article.aggregate([{ $sample: { size: 10 } }])
        .then(function(dbArticle) {
          res.json(dbArticle);
        })
        .catch(function(err) {
          res.json(err);
        });
  
    });
  });

});

app.put("/articles/:id", function(req, res) {
  db.Article.findAndModify({
    query: { _id: req.params.id },
    update: {$set: {"saved": true}}
  })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});