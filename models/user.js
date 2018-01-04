const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Please enter your name',
    maxlength: [50, 'Please enter your name, between 1 and 50 characters.'],
    minlength: [1, 'Please enter your name, between 1 and 50 characters.'],
  },
  email: {
    type: String,
    required: 'Please enter your email',
    maxlength: [50, 'Please enter your email, between 1 and 50 characters.'],
    minlength: [1, 'Please enter your email, between 1 and 50 characters.'],
  },
  dateCreated: {
    type: Date,
  },
  // 24 hour clock
  emailTimes: {
    type: [{ hour: { type: Number, min: 0, max: 23 }, minutes: { type: Number, min: 0, max: 59 } }]
  }
});
const model = mongoose.model('User', UserSchema);
module.exports = model;
