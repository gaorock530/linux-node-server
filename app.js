console.log('Welcome');
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/database', (e, data) => {
  if (e) {
    return console.log('Unable to connect to MongoDB server.');
  }

  console.log('Connected to MongoDB sucessfully!');

  // data.collection('todos').insert({
  //   name: 'Magic',
  //   age: 32,
  //   address: 'Jin Jia Ying, Xinxiang',
  //   completed: false
  // });

  // data.collection('todos').find({
  //   completed: false
  // }).toArray().then((docs) => {
  //   console.log('collection: todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fatch data!', err);
  // });

  // data.collection('todos').find({
  //   _id: new ObjectID('589760cedf357c9abcc4e6c1')
  // }).toArray().then((docs) => {
  //   console.log('collection: todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fatch data!', err);
  // });
  var fatch = {completed: false};

  data.collection('todos').find(fatch).count().then((docs) => {
    console.log('collection: todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fatch data!', err);
  });

  data.close();

});
// https://download.robomongo.org/0.9.0/linux/robomongo-0.9.0-linux-x86_64-0786489.tar.gz
