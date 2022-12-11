const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const individualUserSchema = new Schema({
  IndividualUser_ID: {
    type: Number,
    required: true,
  },
  individualUser_UserName: {
    type: String,
    required: true,
  },
  individualUser_Email: {
    type: String,
    required: true
  },
  individualUser_Password: {
    type: String,
    required: true,
  },
  individualUser_FirstName: {
    type: String,
    required: true
  },
  individualUser_LastName: {
    type: String,
    required: true,
  },
  individualUser_Gender: {
    type: String,
    required: true
  },
  IndividualUser_Country: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const IndUser = mongoose.model('IndividualUser', individualUserSchema);
module.exports = IndUser;
