const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  email: String,
  toLocation: String,
  date: String,
  time: String,
  status: {
    type: String,
    default: "Pending"
  }
}, {
  timestamps: true // 👈 this enables createdAt and updatedAt
});

module.exports = mongoose.model('Request', requestSchema);
