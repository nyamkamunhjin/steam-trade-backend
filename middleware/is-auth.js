const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

module.exports = (token) => {
  if(!token) {
    return;
  }
  let userData;
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if(err) {
      console.log(err);
    }
    console.log(decoded);
    userData = decoded;
  });
  
  return userData.user;

};