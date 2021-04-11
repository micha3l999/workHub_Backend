const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    imageOriginal: {
      type: string,
      default: null
    },
    imageThumbnail: {
      type: string,
      default: null
    },
  });

  module.exports = {imageSchema};
