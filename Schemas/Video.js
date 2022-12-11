const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  Video_ID: {
    type: Number,
    required: true,
  },
  Video_Link: {
    type: String,
    required: true
  },
  Video_Subtitle: {
    type: String,
    required: true,
  },
  Video_Description: {
    type: String,
    required: true
  },
  Video_Length: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Video = mongoose.model('Video', VideoSchema);
module.exports = Video;
