console.log('deleting data...');
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/database', (e, data) => {
  if (e) {
    return console.log('Unable to connect to MongoDB server.');
  }

  console.log('Connected to MongoDB sucessfully!');


  var fatch = {completed: false};

  //delete many
  // data.collection('todos').deleteMany(fatch).then((docs) => {
  //   console.log('collection: todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to delete data!', err);
  // });

  //delete one
  // data.collection('todos').deleteOne(fatch).then((docs) => {
  //   console.log('collection: todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to delete data!', err);
  // });

  //find one and delete one
  data.collection('todos').findOneAndDelete(fatch).then((docs) => {
    console.log('collection: todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to delete data!', err);
  });


  data.close();

});
