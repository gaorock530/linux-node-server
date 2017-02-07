const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5899a9dbe76af21008a24b4b';

if (!ObjectId.isValid(id)) return console.log('Id not valid!');

// Todo.find({_id: id}).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({_id: id}).then((todo) => {
//   console.log('Todo', todo);
// });

// Todo.findById(id).then((id) => {
//   console.log('Find by ID', id);
// });

User.findById('58977cf9150e3dc69294f9f0').then((user) => {
  if (!user) return console.log('Unable to find User');
  console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
  console.log(e);
});
