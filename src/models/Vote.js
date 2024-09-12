const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  question: String,
  option1: String,
  option1Votes: {
    type: Number,
    default: 0
  },
  option2: String,
  option2Votes: {
    type: Number,
    default: 0
  }
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
