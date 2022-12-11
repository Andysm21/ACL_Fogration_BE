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
    required: true,
  },
  StudentTakeCourse_StudentTakeExam: {
    type: Array,
    required: true
  },
  StudentTakeCourse_Progress: {
    type: String,
    required: true
  },
}, { timestamps: true });

const StudentTakeCourse = mongoose.model('StudentTakeCourse', StudentTakeCourseSchema);
module.exports = StudentTakeCourse;