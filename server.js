const express = require('express');

const accrouters = require('./routers/acc_routers');

const server = express();

server.use(express.json());

server.use('/api/acc', accrouters);

server.get('/', (req, res) => {
  res.send('<h3>DB Helpers with knex</h3>');
});

module.exports = server;