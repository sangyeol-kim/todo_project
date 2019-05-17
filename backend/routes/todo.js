const express = require('express');
const router = express.Router();

const todosController = require('../controller/todos_controller');

// READ ALL
// get /todos
router.get('/', todosController.index)

// READ
// get /todos/:id
router.get('/:id', todosController.show);

// CREATE
// post /todos/create
router.post('/create', todosController.create);

// Edit
// get /todos/edit/:id
router.get('/edit/:id', todosController.edit)

// UPDATE
// put /todos/:id
router.put('/:id', todosController.update);

// DELETE
// delete /todo/:id/
router.delete('/:id', todosController.delete);

module.exports = router;
