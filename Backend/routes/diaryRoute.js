const express = require("express");
const Diary = require("../models/diary");
const Song = require("../models/song");
const router = express.Router();

// get all diaries
router.post("/diary", async (req, res) => {
  const diaries = await Diary.find();
  // expand the songs field to include the actual Song objects
  for (let i = 0; i < diaries.length; i++) {
    const songIds = diaries[i].songs;
    const songs = await Song.find({ _id: { $in: songIds } });
    diaries[i].songs = songs;
  }
  res.send(diaries);
});

// get diary from song id. The 'songs' field in Diary is an array of Song ids. This route will return the Diary that contains the Song with the given id.
router.post("/diaryBySong", async (req, res) => {
  const { id } = req.body;
  const diary = await Diary.findOne({ songs: id });
  res.send(diary);
});

module.exports = router;
