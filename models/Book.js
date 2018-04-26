const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  author: {
    type: String,
    require: true
  },
  description: String,
  publishyear: Number
});

module.exports = mongoose.model("Book", bookSchema);
