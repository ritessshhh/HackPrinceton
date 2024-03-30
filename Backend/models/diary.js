const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/*
Diary has:
_id
username
diary
date
songs: [Song]
consolation: String
public: Boolean
*/

const diarySchema = new Schema({
  username: { type: String, required: true },
  diary: { type: String, required: true },
  date: { type: Date, required: true },
  songs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
  consolation: { type: String, required: true },
  public: { type: Boolean, required: true },
});

const Diary = mongoose.model("Diary", diarySchema);

module.exports = Diary;
