const { PORT, HOST} = require('./config/');
const express = require('express');
const app = express();
const logger = require("./logger");

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, HOST, function () {
  logger.info(`App listening on http://${HOST}:${PORT}`);
});

