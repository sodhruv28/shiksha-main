const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema({
  language_name: { type: String, unique: true }
});

const language = mongoose.model("language", languageSchema);
module.exports = language;
