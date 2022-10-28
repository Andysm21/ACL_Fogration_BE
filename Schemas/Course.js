const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true
  }
}, { timestamps: true });

const User = mongoose.model('Course', courseSchema););
module.exports = Course;