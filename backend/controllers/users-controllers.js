const HttpError = require('../models/http-error');
const User = require('../models/user.js');

//*************** GET all Users *****************//
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    const error = new HttpError('Fetching users failed, please try again later.', 500);
    return next(error);
  }
  res.json({ users: users.map(user => user.toObject({ getters: true })) });
};

exports.getUsers = getUsers;