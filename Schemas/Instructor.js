const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");


const InstructorSchema = new Schema({
    Instructor_ID: {
    type: Number,
    required: true,
  },
  Instructor_username: {
    type: String,
    required: true,
  },
  Instructor_Email: {
    type: String,
    required: false,
  },
  Instructor_Password: {
    type: String,
    required: true,
  },
  Instructor_FirstName: {
    type: String,
    required: false,
  },
  Instructor_LastName: {
    type: String,
    required: false,
  },
  Instructor_Gender: {
    type: String,
    required: false,
  },
  Instructor_Country: {
    type: String,
    required: false,
  },
  Instructor_Courses: {
    type: Array,
    required: false,
  },
  Instructor_Biography: {
    type: String,
    required: false,
  },
  Instructor_Ratings: {
    type: Array,
    required: false,
  },
  Instructor_Reviews: {
    type: Array,
    required: false,
  },
  Instructor_Agreement: {
    type: Boolean,
    required: true,
      default: false,
  },
  Instructor_Current_Balance:{
    type: Number,
    required: true,
  },
  Instructor_Balance_Date:{
    type: Date,
    required: true,
  }
  
}, { timestamps: true });


const Instructor = mongoose.model('Instructor', InstructorSchema);

module.exports = Instructor;
