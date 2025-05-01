const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  email: { type: String, required: true, unique: true },
  name: String,
});

module.exports = mongoose.model('User', userSchema);
