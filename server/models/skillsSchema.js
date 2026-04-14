const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema({
  skills_name: { type: String, unique: true }
});

const skills = mongoose.model("skills", skillsSchema);
module.exports = skills;
