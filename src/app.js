require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');

const localUser = require('./middlewares/mw_users/userLoggedMiddleware');

const methodOverride = require ("method-override");

const cors = require('cors');

var indexRouter = require('./routes/home');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var footerRouter = require('./routes/footer');
var categoriesRouter = require('./routes/categories');

//inicializando rutas de api
var apiMainRouter = require('./routes/api/apiMain');
var apiAuthRouter = require('./routes/api/apiAuth');
var apiUsersRouter = require('./routes/api/apiUsers');
var apiProductsRouter = require('./routes/api/apiProducts');
var apiFooterRouter = require('./routes/api/apiFooter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..",'public')));

app.use (methodOverride ("_method"));

app.use(session({
  secret : 'BuonAseo',
  resave : false,
  saveUninitialized : true
}));

app.use(cors());

app.use(localUser);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/footer', footerRouter);
app.use('/categories', categoriesRouter);

//rutas para appi
app.use('/api/main', apiMainRouter);
app.use('/api/products', apiProductsRouter);
app.use('/api/users', apiUsersRouter);
app.use('/api/auth', apiAuthRouter);
app.use('/api/footer', apiFooterRouter);

// catch 404 and forward to error handler
app.use("/api/*", (req,res) => res.status(404).json(
  {msg:"ruta no encontrada :C"}
))

app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
