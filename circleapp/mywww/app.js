var express = require('express');
var path = require('path');

var routes = require('./router.js');

var app = express();

app.use(express.static(path.join(__dirname, 'www')));

app.use('/', routes);

app.listen(80);

module.exports = app;
