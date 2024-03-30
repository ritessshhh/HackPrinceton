const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/*
Song has:
_id
username
title
lyrics
style
mood: String
like: Boolean
image: String
url: String
duration: Number
*/

const songSchema = new Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  lyrics: { type: String, required: true },
  style: { type: String, required: true },
  mood: { type: String, required: true },
  like: { type: Boolean, required: true, default: false },
  image: { type: String, required: true },
  url: { type: String, required: true },
  duration: { type: Number, required: true },
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
