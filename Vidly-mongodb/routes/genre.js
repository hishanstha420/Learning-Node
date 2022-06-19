const { Genre, validate } = require("../models/genre");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  const genre = await Genre.find().sort({ name: 1 });
  res.send(genre);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name,
    movies: req.body.movies,
  });

  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, {
    $set: { name: req.body.name, movies: req.body.movies, new: true },
  });

  if (!genre)
    return res.status(404).send("The genre with ID isnot available!!!");

  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send("The genre with Id is not found!!!");

  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with ID isnot available!!!");
  res.send(genre);
});

module.exports = router;
