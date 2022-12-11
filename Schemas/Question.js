const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
 Question_ID: {
    type: Number,
    required: true,
  },
  Question_Name: {
    type: String,
    required: true
  },
  Question_Choices: {
    type: Array,
    required: true,
  },
  Question_Correct_Answers: {
    type: String,
    required: true
  },
  Question_Grade: {
    type: Number,
    required: true
  },
}, { timestamps: true });

const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;