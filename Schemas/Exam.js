const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
Exam_ID: {
    type: Number,
    required: true,
  },
  Exam_Question_ID: {
    type: Array,
    required: true
  },
  Exam_Grade: {
    type: Number,
    required: true,
  },
  Exam_Instructor_ID: {
    type: Number,
    required: true
  },
  Exam_Course_ID: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const Exam = mongoose.model('Exam', ExamSchema);
module.exports = Exam;
