const mongoose = require('mongoose');

const HttpError = require('../models/http-error');

const Todo = require('../models/todo');
const User = require('../models/user');

//**************** GET todo by user id *****************//
const getTodosByUserId = async (req, res, next) => {
  
  const userId = req.params.uid;

  let userWithTodos;
  try {
    userWithTodos = await User.findById(userId).populate('todos');
  } catch (err) {
    const error = new HttpError('Fetching todos failed, please try again later.', 500);
    return next(error);
  }

  if (!userWithTodos || userWithTodos.todos.length === 0) {
    return next( new HttpError('Could not find todos for the provided user id.', 404));
  }

  res.json({ todos: userWithTodos.todos.map(todo => todo.toObject({ getters: true })) });
};

//*************** POST a todo **************************//
const createTodo = async (req, res, next) => {

  const { title, creator } = req.body;
  
  //Initialization
  const createdTodo = new Todo({
    title,
    creator
  });

  //Check whether the provided CREATOR exists or NOT
  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError('Creating todo failed, please try again.', 500 );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id.', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdTodo.save({ session: sess }); 
    user.todos.push(createdTodo); 
    await user.save({ session: sess }); 
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError('Creating todo failed, please try again.', 500);
    return next(error);
  }

  res.status(201).json({ todo: createdTodo });
};

//************** DELETE a todo *************************//
const deleteTodo = async (req, res, next) => {

  const todoId = req.params.todoid;
  let todo;
  try {
    todo = await Todo.findById(todoId).populate('creator');
  } catch (err) {
    const error = new HttpError('Something went wrong, could not delete todo.', 500);
    return next(error);
  }

  if (!todo) {
    const error = new HttpError('Could not find todo for this id.', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await todo.remove({session: sess});
    todo.creator.todos.pull(todo);
    await todo.creator.save({session: sess});
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete todo.',
      500
    );
    return next(error);
  }
  
  res.status(200).json({ message: 'Deleted todo.' });
};

exports.getTodosByUserId = getTodosByUserId;
exports.createTodo = createTodo;
exports.deleteTodo = deleteTodo;
