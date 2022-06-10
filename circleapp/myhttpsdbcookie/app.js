var express = require('express');
var path = require('path');

var routes = require('./router.js');

var app = express();

app.use(express.static(path.join(__dirname, 'www')));

app.use('/', routes);

var https = require('https'),
    fs = require("fs");

var options = {
    key: fs.readFileSync('./privatekey.pem'),
    cert: fs.readFileSync('./certificate.pem')
};

https.createServer(options, app).listen(443, function () {
    console.log('My HTTPS server listening on port ' + 443);
});

module.exports = app;