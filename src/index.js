var path = require('path');
const express = require("express");
const bodyparser = require("body-parser");
const routes = require("./routes/routes");
var logger = require('morgan');
const cors = require("cors");
var swaggerJsDoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');

/** Config do Swagger */
const swaggerOpts = {
    swaggerDefinition: {
      info: {
        title: "B1 - API",
        description: "API da aplicação B1 - TCC Eng de Software 2021"
      },
      servers: ["http://localhost:"+port]
    },
    apis: ['./src/routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOpts);
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

/**  Adicionar rotas de forma isolada */
app.use(routes());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(logger('dev'));



/** Start com porta que o processo der como disponivel */
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
app.listen(port, 'localhost', () => {
    console.log(`Server running at: http://localhost:${port}`);
});

function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }
  
