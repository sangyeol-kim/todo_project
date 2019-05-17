const mongoose = require('mongoose');

let TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    require: true
  },
  deadline: {
    type: Date,
    optional: true
  },
  priority: {
    type: String,
    default: 'black'
  },
  completed: {
    type: String,
    default: "False"
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Todo', TodoSchema);
