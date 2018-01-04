const express = require("express");
const app = express();
const mongoose = require('mongoose');
const apiRoutes = require('express').Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const { join } = require('path');
const users = require('./app/users');
const port = 3000;
//TODO: Enter mongodb url here:
const dbUrl = '';
const timer = 
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

connect = function() {
  const options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(dbUrl, options);
  return mongoose.connection;
}
const connection = connect();

const models = join(__dirname, './models');

const db = {};
fs.readdirSync(models)
  .filter(file => ~file.indexOf('.js'))
  .forEach((file) => {
    const path = require(join(models, file));

    db[path.modelName] = path;
  });

apiRoutes.get('/helloWorld', function (req, res) {
  return res.status(200).json({ message: 'Hello World' });
});

apiRoutes.post('/createUser', users.createUser);

apiRoutes.post('/deleteUser', users.deleteUser);

apiRoutes.post('/updateTimes', users.updateTimes);

apiRoutes.post('/updateEmail', users.updateEmail);

var startService = require("./app/service")(false);

connection
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', function () {
    app.listen(port, function () {
      console.log('Set Up Complete. Listening..');
      app.use('/api', apiRoutes);
    });
  });

  process.on('uncaughtException', (err) => {
    console.log(err.message);
    process.exit(1);
  });
