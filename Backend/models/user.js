const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/*
User has:
_id
username
diary: [Diary]
*/

const userSchema = new Schema({
  username: { type: String, required: true },
  diary: [{ type: Schema.Types.ObjectId, ref: "Diary" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
