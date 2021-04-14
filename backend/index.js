const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const todosRoutes = require('./routes/todos-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

//CORS handling
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

//Routes
app.use('/api/users', usersRoutes);
app.use('/api/todos', todosRoutes);

//If NO above routes match
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

//Send Error response
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

//SERVER initialization
mongoose.connect( `mongodb+srv://sourav:eSEm8jzdkd3XtN9Y@cluster0.zpwvn.mongodb.net/MERN-DB?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to DB'+'\n'+'Server running on PORT : 5000')
  app.listen(5000);
})
.catch(err => {
    console.log(err);
});
