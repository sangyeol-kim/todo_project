const Todo = require('../model/todo');

exports.index = (req, res, next) => {
  Todo.find({}, function(err, todos) {
    if (err) {
      return next(err)
    }
    res.json(todos)
  });
};

exports.create = (req, res, next) => {
  console.log(req.body)
  let todo = new Todo({
    title: req.body.title,
    deadline: req.body.deadline || null,
    priority: req.body.priority || 3
  });

  todo.save((err) => {
    if (err) {
      return next(err)
    }
    res.json(todo)
  });
};

exports.edit = (req, res, next) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) {
      return next(err)
    }
    res.json(todo);
  });
};

exports.update = (req, res, next) => {
  Todo.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, todo) => {
    if (err) {
      return next(err)
    }
    res.json(todo);
  });
};

exports.delete = (req, res, next) => {
  Todo.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err)
    }
    res.status(200).send('Deleted Successfully');
  });
};

exports.complete = (req, res, next) => {
  Todo.findOne({_id: req.params.id}, function(err, todo){
    todo.complete = !todo.complete;
    todo.save((err) =>{
    if (err) {
      return next(err)
    }
    res.json(todo)
    });
 });
}