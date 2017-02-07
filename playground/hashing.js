const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = "asdasd";

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});

var hashedPassword = '$2a$10$uZQx0TQZGBBgPZTB0EP6aO77HpsxnIPcZUSN5D7IyuaB.Ol5EGBOy';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});

// var data = {
//   id: 10
// };
//
// var token = jwt.sign(data, '123abc');
//
// console.log(token);
//
// var decoded = jwt.verify(token, '123abc');
//
// console.log(decoded);

// var message = "I am a user number 3";
//
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'salt').toString()
// }
//
// //middle man attack
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'salt').toString();
//
// if (token.hash === resultHash){
//   console.log('GOOD!');
// }else{
//   console.log('BAD!!');
// }
