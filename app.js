const express = require("express");
const app = express();
const apiRoutes = require('express').Router();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


apiRoutes.get('/helloWorld', function (req, res) {
    return res.status(200).json({ message: 'Hello World' });
})


app.listen(3000, function () {
    app.use('/api', apiRoutes);
});
