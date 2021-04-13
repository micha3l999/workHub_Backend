const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const router = express.Router();

//User routes
const userRoutes = require("./lib/user/userRoutes.js");

connectDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const { PORT, HOST } = require("./config/index");
const logger = require("./logger");

app.use("/", router);

app.get("/", (req, res) => {
  res.send("API is running.....");
});

app.use("/api/user", userRoutes);

app.listen(PORT, function () {
  logger.info(`App listening on http://${HOST}:${PORT}`);
});
