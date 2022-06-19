const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  movies: {
    type: Array,
    required: true,
    // minlength: 3,
    // maxlength: 40,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    movies: Joi.array().items(Joi.string().required()),
  });

  return schema.validate(genre);
};

exports.Genre = Genre;
exports.validate = validateGenre;
