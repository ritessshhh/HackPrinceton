const express = require("express");
const User = require("../models/user");
const Song = require("../models/song");
const Diary = require("../models/diary");
const router = express.Router();

// get songs by diary date
router.post("/songByDiaryDate", async (req, res) => {
  const { date } = req.body;
  // get diary whose date is within the same day
  const diary = await Diary.findOne({
    date: {
      $gte: new Date(date).setHours(0, 0, 0, 0),
      $lt: new Date(date).setHours(23, 59, 59, 999),
    },
  });
  const songs = await Song.find({ _id: { $in: diary.songs } });

  if (songs) {
    res.status(200).send(songs);
  }

  res.status(404).send("Songs not found");
});

// get all songs with username
router.post("/allSong", async (req, res) => {
  const { username } = req.body;
  const songs = await Song.find({ username: username });

  if (songs) {
    res.status(200).send(songs);
  } else {
    res.status(404).send("Songs not found");
  }
});

// get song by id with username
router.post("/song", async (req, res) => {
  const { username, id } = req.body;
  console.log(username, id);
  const song = await Song.findOne({ _id: id, username: username });

  if (song) {
    res.status(200).send(song);
  } else {
    res.status(404).send("Song not found");
  }
});

// get multiple songs by array of song ids
router.post("/multipleSongs", async (req, res) => {
  const { songs: songIds } = req.body;
  const songs = await Song.find({ _id: { $in: songIds } });
  res.send(songs);
});

// toggle song like
router.post("/like", async (req, res) => {
  const { username, id } = req.body;
  const song = await Song.findOne({ _id: id, username: username });

  if (song) {
    song.like = !song.like;
    await song.save();
    res.status(200).send(song);
  } else {
    res.status(404).send("Song not found");
  }
});

module.exports = router;
