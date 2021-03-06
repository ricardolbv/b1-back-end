var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
var swaggerJsDoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');
var db = require('./database/db');

var routes = require('./routes/routes');

/** Config do Swagger */
const swaggerOpts = {
  swaggerDefinition: {
    info: {
      title: "B1 - API",
      description: "API da aplicação B1 - TCC Eng de Software 2021"
    },
    servers: ["http://localhost:5000"]
  },
  apis: ['./routes/*.js']
}

db
  .authenticate()
  .then(function () {
    console.log("Conectando com sucesso!");
  })
  .catch(function (erro) {
    console.log("Falha ao se conectar: " + erro);
  });

const swaggerDocs = swaggerJsDoc(swaggerOpts);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(routes());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
