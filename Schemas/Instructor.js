const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstructorSchema = new Schema({
    Instructor_ID: {
    type: String,
    required: true,
  },
  Instructor_Email: {
    type: String,
    required: true
  },
  Instructor_Password: {
    type: String,
    required: true,
  },
  Instructor_FirstName: {
    type: String,
    required: true
  },
  Instructor_LastName: {
    type: String,
    required: true,
  },
  Instructor_Gender: {
    type: String,
    required: true
  },
  Instructor_Country: {
    type: String,
    required: true,
  },
  Instructor_Courses: {
    type: Array,
    required: true,
  },
  Instructor_Biography: {
    type: String,
    required: true
  },
  Instructor_Ratings: {
    type: Array,
    required: true,
  },
  Instructor_Reviews: {
    type: Array,
    required: true,
  },
}, { timestamps: true });

const Instructor = mongoose.model('Instructor', InstructorSchema);
module.exports = Instructor;