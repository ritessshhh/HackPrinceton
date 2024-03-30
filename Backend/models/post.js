const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/*
Post has:
_id
username
title
content
date
author
diary: Diary
song: Song
*/

const postSchema = new Schema({
  content: { type: String, required: true },
  date: { type: Date, required: true },
  author: { type: String, required: true },
  song: { type: Schema.Types.ObjectId, ref: "Song" },
  songTitle: { type: String, required: true },
  mood: { type: String, required: true },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
