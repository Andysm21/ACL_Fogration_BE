const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentTookExamSchema = new Schema({
    StudentTookExam_Student_ID: {
    type: Number,
    required: true,
  },
  StudentTookExam_Exam_ID: {
    type: Number,
    required: true
  },
  StudentTookExam_Answers: {
    type: Array,
    required: true,
  },
  StudentTookExam_Grades: {
    type: Number,
    required: true
  },
  StudentTookExam_ID: {
    type: Number,
    required: true
  },
}, { timestamps: true });

const StudentTookexam = mongoose.model('StudentTookexam', StudentTookExamSchema);
module.exports = StudentTookexam;
