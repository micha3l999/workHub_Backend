const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({

    userEmails: [
      {
        type: String,
        require: true,
      }
    ],

})

const Admin = mongoose.model("AdminSettings", adminSchema);
module.exports = Admin;