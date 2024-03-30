const express = require("express");
const Post = require("../models/post");
const { getMoodCategoryByPost } = require("../utils/openAIUtil");
const Song = require("../models/song");
const router = express.Router();

// get all posts
router.post("/getPost", async (req, res) => {
  const posts = await Post.find();
  console.log(posts);
  res.send(posts);
});

// get post by id
router.post("/post", async (req, res) => {
  const { id } = req.body;
  const post = await Post.findOne({ _id: id });
  res.send(post);
});

// get posts by mood
router.post("/postByMood", async (req, res) => {
  const { mood } = req.body;
  const posts = await Post.find({ mood: mood });
  res.send(posts);
});

// create post
router.post("/createPost", async (req, res) => {
  const { content, author, song } = req.body;
  const foundSong = await Song.findOne({ _id: song });
  if (!foundSong) {
    res.status(404).send("Song not found");
    return;
  }

  const songTitle = foundSong.title;
  const mood = await getMoodCategoryByPost(content);
  const date = new Date();
  const newPost = new Post({
    content: content,
    author: author,
    date: date,
    song: song,
    songTitle: songTitle,
    mood: mood,
  });

  await newPost.save();
  res.status(200).send(newPost);
});

module.exports = router;
