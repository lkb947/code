var express = require('express');
var path = require('path');

var routes = require('./router.js');

var app = express();

app.use(express.static(path.join(__dirname, 'kbl_pc')));

app.use('/', routes);

//导入https模块
var https = require('https'),
    fs = require("fs");
//读取密钥文件
var options = {
    key: fs.readFileSync('./privatekey.pem'),
    cert: fs.readFileSync('./certificate.pem')
};
//启动服务
https.createServer(options, app).listen(443, function () {
    console.log('My HTTPS server listening on port ' + 443);
    console.log('请访问: https://localhost:443');
});

module.exports = app;