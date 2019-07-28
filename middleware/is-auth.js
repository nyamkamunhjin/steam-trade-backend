const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

module.exports = (token) => {
  if(!token) {
    return;
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  
  return decoded.user;

};