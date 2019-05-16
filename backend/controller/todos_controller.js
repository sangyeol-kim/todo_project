const Todo = require('../model/todo');

exports.index = (req, res) => {
  Todo.find({}, function(err, todos) {
    if (err) {
      next(err);
    }
    res.json(todos)
    // JSON.parse(JSON.stringify(docs))
  });
};

exports.create = (req, res) => {
  let todo = new Todo({
    title: req.body.todo.title,
    content: req.body.todo.content
  });

  todo.save((err) => {
    if (err) {
      return console.error(err);
    }
    res.status(200).send('ok');
  });
};

exports.show = (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    // id에 해당하는 document 반환.
    if (err) {
      return next(err);
    }
    res.send(todo);
  });
};

exports.update = (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, todo) => {
    // $: Query Selection Operator
    if (err) {
      return next(err);
    }
    res.send('todo Updated');
  });
};

exports.delete = (req, res) => {
  Todo.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
    res.send('Deleted Successfully');
  });
};
