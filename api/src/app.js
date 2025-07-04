const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
require('dotenv').config();
var cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer');



//hola soy sara 
//y yo soy seba y tomas
require('./db.js');

const server = express();


server.name = 'API';

server.use(bodyParser.json());

server.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
server.use(bodyParser.urlencoded({ extended: true }));
// const jwtCheck = auth({
//   audience: 'https://underevents/api',
//   issuerBaseURL: 'dev-jdkm0r3xevm3bopt.us.auth0.com',
//   tokenSigningAlg: 'RS256',
// });
// server.use(jwtCheck)

server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
