const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RefundRequestSchema = new Schema({
  User_ID: {
    type: Number,
    required: true
  },
  Course_ID: {
    type: Number,
    required: true
  },
  Request_Status:{
    type: String,
    required: true
  },
  Refund_Amount:{
    type: Number,
    required: true
  },
}, { timestamps: true });

const RefundRequest = mongoose.model('RefundRequest', RefundRequestSchema);
module.exports = RefundRequest;