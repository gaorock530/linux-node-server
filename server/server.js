const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/database');

//build a mongoose model
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

// var newTodo = new Todo({
//   text: 'edit this video'
// });
//
// newTodo.save().then((data) => {
//   console.log('Saved Todo...');
//   console.log(data);
// }, (e) => {
//   console.log('Unable to save data!', e);
// });

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

var user1 = new User({
  email: 'gaorock530@hotmail.com',
  password: 'abc123456789'
});

user1.save().then((data) => {
  console.log('Saved Todo...');
  console.log(data);
}, (e) => {
  console.log('Unable to save data!', e);
});
