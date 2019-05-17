const Todo = require('../model/todo');

exports.index = (req, res) => {
  Todo.find({}, function(err, todos) {
    if (err) {
      res.status(500).send('Something broke!');
    }
    res.json(todos)
    // JSON.parse(JSON.stringify(docs))
  });
};

exports.create = (req, res) => {
  console.log(req.body)
  let todo = new Todo({
    title: req.body.title || req.body.todo.title,
    content: req.body.content || req.body.todo.content
  });

  todo.save((err) => {
    if (err) {
      res.status(500).send('Something broke!');
    }
    res.status(200).send('Created Successfully');
  });
};

exports.show = (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    // id에 해당하는 document 반환.
    if (err) {
      res.status(500).send('Something broke!');
    }
    res.json(todo);
  });
};

exports.update = (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, todo) => {
    // $: Query Selection Operator
    if (err) {
      res.status(500).send('Something broke!');
    }
    res.send('todo Updated');
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
