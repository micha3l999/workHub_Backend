
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    imageOriginal: {
      type: String,
      default: null
    },
    imageThumbnail: {
      type: String,
      default: null
    },
  });

  module.exports = {imageSchema};