const express = require("express");
const app = express();
const apiRoutes = require('express').Router();
const bodyParser = require('body-parser');
const users = require('./app/users');

const port = 3000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

apiRoutes.get('/helloWorld', function (req, res) {
    return res.status(200).json({ message: 'Hello World' });
});

apiRoutes.post('/createUser', users.createUser);

apiRoutes.post('/deleteUser', users.deleteUser);

apiRoutes.post('/updateTimes', users.updateTimes);

apiRoutes.post('/updateEmail', users.updateEmail);

app.listen(port, function () {
    app.use('/api', apiRoutes);
});
