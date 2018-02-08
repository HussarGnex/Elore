const express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  path = require('path');

const app = express();
const db_url = require('./server/config/database').url; // pobierane będzie z pliku config
const db = mongoose.connect(db_url);

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(express.static(path.join(__dirname, 'dist')));

// Mongoose Models
const User = require('./server/models/user.server.model'),
  Course = require('./server/models/course.server.model');

// Express Routers
const userRouter = require('./server/routes/user.server.routes')(User),
  courseRouter = require('./server/routes/course.server.routes')(Course);

// Routes
app.use('/api/user', userRouter);
app.use('/api/course', courseRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Running server
const server = app.listen(process.env.PORT || 8000, () => {
  const port = server.address().port;
  console.log("Server is running on port -> ", port);
});
