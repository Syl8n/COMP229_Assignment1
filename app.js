let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');
let multer = require('multer');
let upload = multer();
let session = require('express-session');
let flash = require('express-flash');
let passport = require('passport');

// Database setup
let mongoose = require('mongoose');
let dbURI = require('./config/db');

// Connect to the Database
mongoose.connect(dbURI.AtlasDB);

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});

let app = express();

// session setting
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: "sessionSecret"
}));

// Sets up passport
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// routing
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let contactRouter = require('./routes/businessContact');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/businessContact', contactRouter);

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
