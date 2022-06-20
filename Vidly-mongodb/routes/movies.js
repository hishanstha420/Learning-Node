const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");
const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort({ name: 1 });
  res.send(movies);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findById(req.body.genreId);

  if (!genre) return res.status(404).send("Invalid genre.");

  const movies = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  await movies.save();

  res.send(movies);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movies = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        new: true,
        genre: {
          id: req.body.genreId,
          name: req.body.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
      },
    },
    { new: true }
  );

  if (!movies)
    return res.status(404).send("The movie with ID isnot available!!!");

  res.send(movies);
});

router.delete("/:id", async (req, res) => {
  const movies = await Movie.findByIdAndRemove(req.params.id);
  if (!movies) return res.status(404).send("The movie with Id is not found!!!");

  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movies = await Movie.findById(req.params.id);

  if (!movies)
    return res.status(404).send("The movie with ID isnot available!!!");
  res.send(movies);
});

module.exports = router;
