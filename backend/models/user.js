const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({
  name    : { type: String, required: true },
  email   : { type: String, required: true, unique: true },
  phone   : { type: Number, required: true },
  city    : { type: String, required: true },
  todos   : [{ type: mongoose.Types.ObjectId, required: true, ref: 'Todo' }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
