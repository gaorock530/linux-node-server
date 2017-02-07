const mongoose = require('mongoose');

const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 10
  },
  createdAt: {
    type: Number,
    default: 123456
  }
});

module.exports = {User};
