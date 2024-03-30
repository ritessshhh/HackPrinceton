const async = require("async");
const express = require("express");
const Diary = require("../models/diary");
const Song = require("../models/song");
const router = express.Router();
const { getAudioDurationInSeconds } = require("get-audio-duration");

const sunoAPI = require("../utils/crawler");
const openAIAPI = require("../utils/openAIUtil");

// create new songs by diary input
router.post("/create", async (req, res) => {
  const { username, diary } = req.body;
  const mood = await openAIAPI.getMoodByDiary(diary);
  console.log("Mood: ", mood);
  const lyrics = await openAIAPI.createLyricsByDiary(diary);
  console.log("Lyrics: ", lyrics);
  const consolation = await openAIAPI.createConsolationByDiary(diary);
  console.log("Consolation: ", consolation);
  /*
  music style
  Delightful case
  {Delightful}, female, disney style, notes between D3 to E4

  Consolation case
  {sad}, female, disney style, notes between D3 to E4
  */
  const style = `${mood} female, disney style, notes between D3 to E4`;
  console.log("Style: ", style);
  const title = await openAIAPI.createTitleByLyrics(lyrics);
  console.log("Title: ", title);

  // create new song
  console.log("Creating new song...");
  const { list: songResult, publishedTitle: fileName } =
    await sunoAPI.createNewSongWithPrompt(lyrics, style, title);
  console.log("Song result: ", songResult);
  const songURLArray = Array.from(songResult);

  let uploadedSongURLArray = [];
  let uploadedImageURLArray = [];

  // for each song URL, download and upload. wait for each to finish
  await async.eachOfSeries(songURLArray, async (songURL, index) => {
    console.log("Downloading and uploading song...");
    const realFileName = `${fileName}${index === 0 ? "" : " (1)"}`;
    const { audioURL: uploadedSongURL, imageURL: uploadedImageURL } =
      await sunoAPI.downloadAndUploadSongByURL(songURL, realFileName);
    uploadedSongURLArray.push(uploadedSongURL);
    uploadedImageURLArray.push(uploadedImageURL);
    console.log("Uploaded song URL: ", uploadedSongURL);
  });

  let songIdArray = [];

  // create new songs using the uploaded song URL
  console.log("Configuring new songs...");
  await async.eachOfSeries(
    uploadedSongURLArray,
    async (uploadedSongURL, index) => {
      // get audio duration
      const duration = await getAudioDurationInSeconds(uploadedSongURL);
      console.log("Duration: ", duration);

      const newSong = new Song({
        username: username,
        title: title,
        lyrics: lyrics,
        style: style,
        mood: mood,
        url: uploadedSongURL,
        image: uploadedImageURLArray[index],
        duration: duration,
      });

      const songResult = await newSong.save();
      songIdArray.push(songResult._id);
    }
  );
  console.log("Song ID array: ", songIdArray);

  // create new diary
  console.log("Creating new diary...");
  const newDiary = new Diary({
    username: username,
    diary: diary,
    consolation: consolation,
    songs: songIdArray,
    public: false,
    date: new Date(),
  });

  const diaryResult = await newDiary.save();
  console.log("Diary result: ", diaryResult);
  res.send(diaryResult);
});

module.exports = router;
