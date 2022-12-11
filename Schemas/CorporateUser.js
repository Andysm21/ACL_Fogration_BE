const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CorporateUserSchema = new Schema({
  CorporateUser_ID: {
    type: Number,
    required: true,
  },
  CorporateUser_UserName: {
    type: String,
    required: true,
  },
  CorporateUser_Email: {
    type: String,
    required: false,
  },
  CorporateUser_Password: {
    type: String,
    required: true,
  },
  CorporateUser_FirstName: {
    type: String,
    required: false,
  },
  CorporateUser_LastName: {
    type: String,
    required: false,
  },
  CorporateUser_Gender: {
    type: String,
    required: false,
  },
  CorporateUser_Country: {
    type: String,
    required: false,
  },
  CorporateUser_Corporate: {
    type: String,
    required: false,
  },
  isCorporate: {
    type: Boolean,
    required: false,
  },
}, { timestamps: true });

const CorpUser = mongoose.model('CorporateUser', CorporateUserSchema);
module.exports = CorpUser;
