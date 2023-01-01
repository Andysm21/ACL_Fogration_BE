const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProblemsSchema = new Schema({
 Problem_ID: {
    type: Number,
    required: true,
  },
  User_ID: {
    type: Number,
    required: true
  },
  User_Type: {
    type: Number,
    required: true,
  },
  Problem_Type: {
    type: String,
    required: true
  },
  Course_ID: {
    type: Number,
    required: true
  },
  Problem_Status: {
    type: String,
    required: true
  },
  Problem_Description: {
    type: String,
    required: false
  },
}, { timestamps: true });

const Problem = mongoose.model('Problem', ProblemsSchema);
module.exports = Problem;
