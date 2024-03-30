const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const sunoAPI = require("./utils/crawler");
const openAIAPI = require("./utils/openAIUtil");
const userRouter = require("./routes/userRoute");
const createRouter = require("./routes/createRoute");
const diaryRouter = require("./routes/diaryRoute");
const songRouter = require("./routes/songRoute");
const postRouter = require("./routes/postRoute");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", userRouter);
app.use("/api", createRouter);
app.use("/api", diaryRouter);
app.use("/api", songRouter);
app.use("/api", postRouter);

let cookies = [];

const uri = process.env.ATLAS_URI;

mongoose.connect('mongodb+srv://amirhamza:Nabil.2001@cluster0.vomraa2.mongodb.net/uri');
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.get("/login", async (req, res) => {
  const cookiesResult = await sunoAPI.logInSuno();
  cookies = cookiesResult;

  res.send(cookies);
});

app.get("/library", async (req, res) => {
  //send success message if cookies are not empty
  const result = await sunoAPI.getNewestSong();
  res.send(result);
});

app.post("/create", async (req, res) => {
  const result = await sunoAPI.createNewSong();
  res.send(result);
});

app.post("/createWithPrompt", async (req, res) => {
  const { lyrics, style, title } = req.body;
  const result = await sunoAPI.createNewSongWithPrompt(lyrics, style, title);
  res.send(result);
});

app.post("/download", async (req, res) => {
  const { url } = req.body;
  const result = await sunoAPI.downloadAndUploadSongByURL(url);
  res.send(result);
});

app.post("/lyrics", async (req, res) => {
  const { diary } = req.body;
  const result = await openAIAPI.createLyricsByDiary(diary);
  await res.send(result);
});

app.post("/start", async (req, res) => {
  const { diary } = req.body;
  const lyrics = await openAIAPI.createLyricsByDiary(diary);

  const defaultStyle = "calm mood, femail voice";
  const title = "My Diary";

  const result = await sunoAPI.createNewSongWithPrompt(
    lyrics,
    defaultStyle,
    title
  );

  const songURLArr = Array.from(result);

  console.log(songURLArr[0]);

  const ret = [];

  const uploadURL = await sunoAPI.downloadAndUploadSongByURL(songURLArr[0]);
  ret.push(uploadURL);
  res.send(ret);
});

module.exports = app;
