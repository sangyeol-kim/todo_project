const mongoose = require('mongoose');

let TodoSchema = new mongoose.Schema({
  // To-do title
  title: {
    type: String,
    required: true
  },
  // To-do deadline
  deadline: {
    type: Date,
    optional: true
  },
  // To-do priority
  priority: {
    type: Number,
    optional: true
  },
  // To-do complete state
  complete: {
    type: Boolean,
    default: false
  },
  // To-do create date
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Todo', TodoSchema);
