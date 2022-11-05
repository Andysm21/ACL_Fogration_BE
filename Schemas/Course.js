const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  Course_ID: {
    type: Number,
    required: true,
  },
  Course_Title: {
    type: String,
    required: true,
  },
  Course_Subject: {
    type: String,
    required: true,
  },
  Course_Description: {
    type: String,
    required: true,
  },
  Course_Price: {
    type: Number,
    required: true,
  },
  Course_Rating: {
    type: Number,
    required: true,
  },
  Course_Instructor: {
    type: String,
    required: true,
  },
  Course_Hours: {
    type: Number,
    required: false,
  },
  Course_Country: {
    type: String,
    required: true,
  },
  Course_Discount: {
    type: Number,
    required: true,
  },
  Course_Discount_Duration: {
    type: Number,
    required: true,
  },
  Course_Subtitle: {
    type: Array,
    required: true,
  },
  Course_Trainee: {
    type: Array,
    required: true,
  },
  Course_Review: {
    type: Array,
    required: true,
  },
  Course_Rate: {
    type: Array,
    required: true,
  },
  Course_Exam: {
    type: Array,
    required: true,
  }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;