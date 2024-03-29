const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CorpRequestSchema = new Schema({
  User_ID: {
    type: Number,
    required: true
  },
  Course_Title: {
    type: String,
    required: true
  },
  Request_status:{
    type: String,
    required: true
},
  User_Company:{
    type: String,
    required: true
  },
}, { timestamps: true });

const CorpRequest = mongoose.model('CorpRequest', CorpRequestSchema);
module.exports = CorpRequest;