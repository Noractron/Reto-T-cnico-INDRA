const awsServerlessExpress = require('aws-serverless-express');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const express = require('express');
var bodyParser = require('body-parser')
const app = express();
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

// declaramos una nueva express app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext())

// habilitar todos los metodos para el CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

//Endpoint para el swagger
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require('./routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

// const port = parseInt(process.env.PORT, 10) || 3000;
// server.listen(port);
const server = awsServerlessExpress.createServer(app);

//se descomenta esta linea para que el archivo api.test.js pueda testear los endpoints con el comando npm test
// module.exports = server;

exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
