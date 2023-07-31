//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const uri =
  "mongodb+srv://Rustem101:easy_access@clustertodolist.oo6bpn2.mongodb.net/blogDB";
mongoose.connect(uri).catch((error) => console.log(error));

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
});

const Post = mongoose.model("Post", postSchema);

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  Post.find().then((posts) => {
    console.log(posts);
    res.render("home", {
      posts: posts,
    });
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.title,
    body: req.body.text,
  });
  post.save();
  res.redirect("/");
});

app.get("/posts/:title", function (req, res) {
  Post.find().then((posts) => {
    posts.forEach(function (post) {
      if (_.lowerCase(post.title) === _.lowerCase(req.params.title)) {
        res.render("post", { post: post });
      }
    });
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log("Server started successfully");
});
