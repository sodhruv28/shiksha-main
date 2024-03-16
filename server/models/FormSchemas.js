const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  dob: String,
  email: String,
  lspoken: String,
  skills: String,
  experience: String,
  worksofhours: String,
  profile: String, // Assuming storing file path or URL
  resume: String,  // Assuming storing file path or URL
});

const Teacher = mongoose.model("teacher", teacherSchema);
module.exports = Teacher;
