const mongoose = require('mongoose');

let TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    optional: true
  },
  priority: {
    type: Number,
    optional: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Todo', TodoSchema);
