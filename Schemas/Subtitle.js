const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubtitleSchema = new Schema({
  Subtitle_ID: {
    type: Number,
    required: true,
  },
  Subtitle_Name: {
    type: String,
    required: true
  },
  Subtitle_Course_ID: {
    type: String,
    required: true,
  },
  Subtitle_Video: {
    type: Array,
    required: true
  },
  Subtitle_Hours: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Subtitle = mongoose.model('Subtitle', SubtitleSchema);
module.exports = Subtitle;