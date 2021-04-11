const express = require('express');
const app = express();

const { PORT, HOST} = require('./config/');
const logger = require("./logger");
const Firestore = require("./lib/services/firebase-storage/firebase-admin");

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, HOST, function () {
  logger.info(`App listening on http://${HOST}:${PORT}`);
});

