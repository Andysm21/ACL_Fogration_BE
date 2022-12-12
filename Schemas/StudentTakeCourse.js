const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentTakeCourseSchema = new Schema({
StudentTakeCourse_StudentID: {
    type: Number,
    required: true,
  },
  StudentTakeCourse_CourseID: {
    type: Number,
    required: true
  },
  StudentTakeCourse_WatchedVideo: {
    type: Array,
    required: false,
  },
  StudentTakeCourse_StudentTakeExam: {
    type: Array,
    required: false
  },
  StudentTakeCourse_Progress: {
    type: Number,
    required: false
  },
  StudentTakeCourse_Type: {
    type: Number,
    required: true,

  },
}, { timestamps: true });

const StudentTakeCourse = mongoose.model('StudentTakeCourse', StudentTakeCourseSchema);
module.exports = StudentTakeCourse;
