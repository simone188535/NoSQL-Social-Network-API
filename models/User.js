const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  text: String,
  username: String,
});

const User = model('user', userSchema);

module.exports = User;
