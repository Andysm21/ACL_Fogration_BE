const { date, boolean } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentMadeReviewSchema = new Schema({
    StudentMadeReview_ID: {
        type: Number,
        required: true,
      },
    
    StudentMadeReview_StudentID: {
        type: Number,
        required: true,
      },
    
    StudentMadeReview_CourseID: {
        type: Number,
        required: false,
        default: -1
      },

      StudentMadeReview_InstructorID: {
        type: Number,
        required: false,
        default: -1
      },

    StudentMadeReview_Type: {
        type: Number,
        required: true,
      },

    StudentMadeReview_Review: {
        type: Number,
        required: true,
      }
    
    }, { timestamps: true });


const StudentMadeReview = mongoose.model('StudentMadeReview', StudentMadeReviewSchema);
module.exports = StudentMadeReview;