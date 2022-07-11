//require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  // winston.rejections.handle(
  //   new winston.transports.File({ filename: "unhandledRejections.log" })
  // );

  winston.add(
    new winston.transports.File({
      filename: "logfile.log",
    })
  );
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://127.0.0.1:27017/Vidly",
      level: "info",
    })
  );
};
