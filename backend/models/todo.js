const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  title      : { type: String, required: true },
  creator    : { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Todo', todoSchema);
