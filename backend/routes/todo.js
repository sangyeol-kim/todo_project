const express = require('express');
const router = express.Router();

const todosController = require('../controller/todos_controller');

// READ
// get /todo/:id
// router.get('/:id', todosController.show);
router.get('/', todosController.index)

// CREATE
// post /todo/create
router.post('/create', todosController.create);

// UPDATE
// post /todo/:id/update
// router.post('/:id/update', todosController.update);

// DELETE
// post /todo/:id/delete
// router.post('/:id/delete', todosController.delete);

module.exports = router;
