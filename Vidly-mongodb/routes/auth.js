const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const _ = require("lodash"); //_ by convention
const express = require("express");
const router = express.Router();
const Joi = require("joi");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Email or password");

  const token = user.generateAuthToken();
  res.send(token);
});

validate = (request) => {
  const schema = Joi.object({
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(8).max(255).required(),
  });
  return schema.validate(request);
};

module.exports = router;
