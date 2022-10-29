const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CorporateUserSchema = new Schema({
  CorporateUser_ID: {
    type: String,
    required: true,
  },
  CorporateUser_Email: {
    type: String,
    required: true
  },
  CorporateUser_Password: {
    type: String,
    required: true,
  },
  CorporateUser_FirstName: {
    type: String,
    required: true
  },
  CorporateUser_LastName: {
    type: String,
    required: true,
  },
  CorporateUser_Gender: {
    type: String,
    required: true
  },
  CorporateUser_Country: {
    type: String,
    required: true,
  },
  CorporateUser_Corporate: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const CorpUser = mongoose.model('CorporateUser', CorporateUserSchema);
module.exports = CorpUser;