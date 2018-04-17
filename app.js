var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const {mongoDbUrl} = require('./bin/dbConnection');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
var flash = require('connect-flash');


var app = express();


mongoose.Promise = global.Promise;

mongoose.connect(mongoDbUrl).then((db)=>{
    console.log('mongo connected');
}).catch(err =>{
    console.log(err);
});



app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));


app.engine('handlebars',exphbs({defaultLayout: 'home'}))
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//body parser
app.use(bodyParser.json());

//method override
app.use(methodOverride('_method'));


app.use(session({
  secret: 'patrickKey',
  resave:true,
  saveUninitialized:true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


//local var using middle ware
app.use((req, res, next)=>{
  res.locals.user = req.user || null;
  res.locals.success_message = req.flash('success_message');
  res.locals.error_message = req.flash('error_message');
  res.locals.error = req.flash('error');
  next();
});


//load routes
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');

var usersRouter = require('./routes/users');

//use routes
app.use('/', home);
app.use('/admin', admin);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
