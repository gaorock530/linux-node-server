const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo.js');
const {User} = require('./models/user.js');
const {ObjectId} = require('mongodb');

var app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hello');
});
/*
*---------------------
* Todo App
*---------------------
*/
//add Todos
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

//fatching Todos
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET /todos/12123123
app.get('/todos/:id', (req,res) => {
  var id = req.params.id;
  if (!ObjectId.isValid(id)) return res.status(404).send('ID is not valid!');
  Todo.findById(id).then((todo) => {
    if (!todo) return res.send('Unable to find');
    res.send(JSON.stringify(todo, undefined, 2));
  }, (e) => {
    console.log(e);
    res.send('Server error');
  });
});

//Delete Todos
app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectId.isValid(id)) return res.status(404).send('ID is not valid!');
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) return res.status(404).send('Unable to find');
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

//Update Todos
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  if (!ObjectId.isValid(id)) return res.status(404).send('ID is not valid!');
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) return res.status(404).send('Unable to update');
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});
/*
*---------------------
* User App
*---------------------
*/
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);
  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(`Check email or password again! ${e}`);
  });

});

app.get('/users', (req,res) => {
  User.find().then((users) => {
    res.send({users});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/users/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectId.isValid(id)) return res.status(400).send('Invalid ID!');
  User.findById(id).then((user) => {
    if (!user) return res.status(404).send('Unable to find user!');
    res.send({user});
  }).catch((e) => {
    res.status(400).send('Server error!');
  });
});

app.delete('/users/:id', (req, res) => {

});

app.patch('/user/:id', (req, res) => {

});

app.listen(3000, (con) => {
  console.log('Connected no port: 3000');
});

module.exports = {app};
