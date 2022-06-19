const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const app = express();
const genres = require("./routes/genre");
const customers = require("./routes/customers");

mongoose
  .connect("mongodb://127.0.0.1:27017/Vidly")
  .then(() => console.log("connection successful!!"))
  .catch((err) => console.log("Connection Failed", err.message));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}....`);
});
