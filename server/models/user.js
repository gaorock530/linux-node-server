const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{value} is not valid email address'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

userSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
};

userSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'magic').toString();
  user.tokens.push({access, token});
  return user.save().then(() => {
    return token;
  });
}

userSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'magic');
  } catch(e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

userSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if (!user) return Promise.reject('User not found!');

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, pass) => {
        if (err) return reject('Internal Error, Please try again later!');
        if (pass) {
          return resolve(user);
        }else{
          return reject('Wrong password!');
        }
      });
    });
  });
};

userSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password')){

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  }else{
    next();
  }

});

var User = mongoose.model('User', userSchema);

module.exports = {User};
