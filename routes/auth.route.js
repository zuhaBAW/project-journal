const bcrypt = require("bcryptjs");
const config = require("config");
const { User, validateLoginData, validateUser } = require("../models/user.model");
const { SectionModel } = require("../models/sections")
const express = require("express");
const router = express.Router();

// Registering new user
router.post("/register", async (req, res) => {
  // validate the request body first
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //find an existing user
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  });
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  const token = user.generateAuthToken();
  if (token.type === 'error') {
    res.status(400).send({systemMessage: error.details[0].message, message: 'Registeration successful, failed to update in media server. contact support team.'});
  }
  res.header("x-auth-token", token).send({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: token
  });

});

router.post("/login", async (req , res) => {
  const { error } = validateLoginData(req.body);
  //const err = "login failed";
  if (error) {
    return res.status(400).send(error.details[0].message);
    //return(error);
    //return(err)
  }


  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("User does not exist!");

  bcrypt.compare(req.body.password, user.password, function(err, bcryptRes) {
    if (bcryptRes == false) return res.status(400).send("Password do not match!");
    console.log('Authenticated!')
    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
      section: user.sections


    });
  });
})

module.exports = router;
