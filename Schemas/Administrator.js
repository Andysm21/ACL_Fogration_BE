const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  Admin_ID: {
    type: String,
    required: true,
  },
  Admin_Email: {
    type: String,
    required: true
  },
  Admin_Password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

  const Admin = mongoose.model('Admin', AdminSchema);
  module.exports = Admin;