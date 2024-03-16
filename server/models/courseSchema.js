const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
  image: String,
  course_name: { type: String, unique: true },
  description: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
  course_url: String,
  lang: [String],
  actual_price: Number,
  discounted_price: Number,
  what_you_will_learn: [String],
  content: [String],
});


const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
