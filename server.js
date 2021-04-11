const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();

connectDB();

const app = express();

const { PORT, HOST } = require("./config/index");
const logger = require("./logger");

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, HOST, function () {
  logger.info(`App listening on http://${HOST}:${PORT}`);
});
