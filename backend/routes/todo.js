const express = require('express');
const router = express.Router();

const todosController = require('../controller/todos_controller');

// READ ALL
router.get('/', todosController.index)

// READ
// get /todo/:id
router.get('/:id', todosController.show);

// CREATE
// post /todo/create
router.post('/create', todosController.create);

// UPDATE
// post /todo/:id/update
// router.post('/:id/update', todosController.update);

// DELETE
// post /todo/:id/delete
router.delete('/:id', todosController.delete);

module.exports = router;
