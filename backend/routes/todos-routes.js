const express = require('express');

const todosControllers = require('../controllers/todos-controllers');

const router = express.Router();


//GET todo by user id
router.get('/user/:uid', todosControllers.getTodosByUserId);

//POST a todo
router.post('/', todosControllers.createTodo);

//DELETE a todo
router.delete('/:todoid', todosControllers.deleteTodo);

module.exports = router;
