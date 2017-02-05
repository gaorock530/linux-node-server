console.log('updating data...');
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/database', (e, data) => {
  if (e) {
    return console.log('Unable to connect to MongoDB server.');
  }

  console.log('Connected to MongoDB sucessfully!');

  var update = {_id: new ObjectID('58976bdb271568bd9028e025')};
  var newUpdate = {
    $set: {
      completed: true
    }
  }
  //updating using $set
  // data.collection('todos').findOneAndUpdate(update, newUpdate, {returnOriginal: false}).then((newData) => {
  //   console.log(newData);
  // }, (err) => {
  //   console.log('Unable to update!', err);
  // });

  //updating using $ins
  data.collection('todos').findOneAndUpdate({
    _id: new ObjectID('58976bdb271568bd9028e025')
  }, {
    $set: {
      name: 'Punkhead'
    },
    $inc: {
      age: -5
    }
  },{
    returnOriginal: false
  }).then((newData) => {
    console.log(newData);
  });


  data.close();

});
