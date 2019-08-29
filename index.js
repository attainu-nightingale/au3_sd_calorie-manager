var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";
var db;
var ObjectId = require("mongodb").ObjectID;

MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(error, client) {
    if (error) throw error;
    db = client.db("users");
  }
);

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "this is secret session"
  })
);

app.set("view engine", "hbs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.send("welcome to calorify.me");
});
app.listen(3000);
