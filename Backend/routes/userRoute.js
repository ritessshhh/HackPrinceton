const express = require("express");
const User = require("../models/user");
const router = express.Router();

// login
router.post("/login", async (req, res) => {
  const { username } = req.body;

  // check if username exists
  const user = await User.findOne({
    username: username,
  });

  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send("User not found");
  }
});

// register
router.post("/register", async (req, res) => {
  const { username } = req.body;

  // check if username exists
  const user = await User.findOne({
    username: username,
  });

  if (user) {
    res.status(404).send("User already exists");
  } else {
    const newUser = new User({
      username: username,
    });

    await newUser.save();
    res.status(200).send(newUser);
  }
});

module.exports = router;
