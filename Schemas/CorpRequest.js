const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CorpRequestSchema = new Schema({
  User_ID: {
    type: Number,
    required: true
  },
  Course_ID: {
    type: Number,
    required: true
  },
}, { timestamps: true });

const CorpRequest = mongoose.model('CorpRequest', CorpRequestSchema);
module.exports = CorpRequest;