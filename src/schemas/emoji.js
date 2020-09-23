// import node modules
const mongoose = require('mongoose');

// define Game schema
const Emoji = new mongoose.Schema({
  name: String,
  wins: Number,
  losses: Number,
  ratio: Number
});

// compile model from schema
module.exports = mongoose.model('Emoji', Emoji);