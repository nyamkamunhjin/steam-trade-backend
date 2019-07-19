const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  
  steam_id: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
