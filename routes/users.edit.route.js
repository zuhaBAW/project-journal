const auth = require("../middleware/auth");
const { User } = require("../models/user.model");
const express = require("express");
const router = express.Router();

router.post("/name", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  var channels = user.channels;
  user.name = req.body.name;
  const result = await user.save();
  if(req.body.name == result.name) {
    res.send({ message: 'Name changed'})
  } else {
    res.send({ error: 'Could not save at this moment.'})
  }
});

router.post("/password", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  var channels = user.channels;
  user.password = req.body.password;
  const result = await user.save();
  if(result.password) {
    res.send({ message: 'Password changed'})
  } else {
    res.send({ error: 'Could not save at this moment.'})
  }
});

module.exports = router;
