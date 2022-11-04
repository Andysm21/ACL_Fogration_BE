const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    type: Array<String>(100),
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
  }
}, { timestamps: true });

const Instructor = mongoose.model('Instructor', InstructorSchema);
module.exports = Instructor;