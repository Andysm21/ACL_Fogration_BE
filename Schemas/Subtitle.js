const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubtitleSchema = new Schema({
  Subttitle_ID: {
    type: String,
    required: true,
  },
  Subttitle_Name: {
    type: String,
    required: true
  },
  Subttitle_Course_ID: {
    type: String,
    required: true,
  },
  Subttitle_Video: {
    type: Array,
    required: true
  },
  Subttitle_Hours: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Subttitle = mongoose.model('Subttitle', SubtitleSchema);
module.exports = Subttitle;