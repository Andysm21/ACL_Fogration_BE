const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentTookExamSchema = new Schema({
    StudentTookExam_Student_ID: {
    type: String,
    required: true,
  },
  StudentTookExam_Exam_ID: {
    type: String,
    required: true
  },
  StudentTookExam_Answers: {
    type: Array,
    required: true,
  },
  StudentTookExam_Grades: {
    type: String,
    required: true
  },
  StudentTookExam_ID: {
    type: String,
    required: true
  },
}, { timestamps: true });

const StudentTookexam = mongoose.model('StudentTookexam', StudentTookExamSchema);
module.exports = StudentTookexam;