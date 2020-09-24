const path = require('path');
require('dotenv').config();
const express = require('express');
const http = require('http');
const db = require('./db');
const api = require('./api');
const session = require('express-session');
const bodyParser = require('body-parser');
const _ = require('lodash');


const app = express();
const server = http.createServer(app);

// set POST request body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: 'session-secret',
  resave: 'false',
  saveUninitialized: 'true'
}));

app.use('/static',express.static('public'));
app.use('/api', api);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.get('/rankings', (req, res) => {
  res.sendFile(`${__dirname}/views/rankings.html`);
});

server.listen(process.env.PORT, () => {
  console.log(`Listening on localhost:${process.env.PORT}`);
});
