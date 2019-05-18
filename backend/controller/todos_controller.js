const Todo = require('../model/todo');

exports.index = (req, res) => {
  Todo.find({}, function(err, todos) {
    if (err) {
      res.status(500).send('Something broke!');
    }
    res.json(todos)
  });
};

exports.create = (req, res) => {
  console.log(req.body)
  let todo = new Todo({
    title: req.body.title,
    deadline: req.body.deadline || null,
    priority: req.body.priority || 3
  });

  todo.save((err) => {
    if (err) {
      res.status(500).send('Something broke!');
    }
    res.json(todo)
  });
};

exports.show = (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) {
      res.status(500).send('Something broke!');
    }
    res.json(todo);
  });
};

exports.edit = (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) {
      res.status(500).send('Something broke!');
    }
    res.json(todo);
  });
};

exports.update = (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, todo) => {
    if (err) {
      res.status(500).send('Something broke!');
    }
    res.json(todo);
  });
};

exports.delete = (req, res) => {
  Todo.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.status(500).send('Something broke!');
    }
    res.status(200).send('Deleted Successfully');
  });
};
