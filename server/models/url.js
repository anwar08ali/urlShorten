const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema({
  longURL: {
    type: String,
    required: true,
  },
  shortURL: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});
module.exports = mongoose.model("URL", urlSchema);
