const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  whisper: {
    type: String,
    required: true,
  },
  confidence: String,
  status: String,
});

const Userdb = mongoose.model("userdb", schema);

module.exports - Userdb;
