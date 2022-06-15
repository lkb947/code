'use strict';
// 导入百度语音的开发包
const AipSpeech = require("baidu-aip-sdk").speech;
var https = require('https');
const fs = require('fs');

// 自签名的密钥，跟HTTPS服务一样
var keypath = process.cwd() + '/privatekey.pem';
var certpath = process.cwd() + '/certificate.pem';

// 创建WebSocket服务器
var ws = require('ws');

var options = {
    key: fs.readFileSync(keypath),
    cert: fs.readFileSync(certpath)
};

let Server = https.createServer(options, function (req, res) { // 要是单纯的https连接的话就会返回这个提示
    res.writeHead(403);
    res.end("This is a  WebSockets server!\n");
}).listen(9001); // 监听9001端口

var wss = new ws.Server({
    server: Server
}); //把创建好的https服务器放进websocket的创建函数里，ws会用这个服务器来创建wss服务

let resTxt;

// WebSocket服务器连接
wss.on('connection', ws => {
    console.log('server connected');
    ws.on('message', data => {
        console.log('server recived audio blob');

        fs.writeFile('../assets/recorder.wav', data, (err) => {
            if (err) {
                console.log("err:", err);

            } else {
                //ws.send('success')
                console.log("record success.");
            }
        })

        // 替换百度云API控制台中新建百度语音应用的 Api Key 和 Secret Key
        let client = new AipSpeech(0, 'VuuX6WSbk0rk1hXdO6uUBHSn', 'h90GW0ig9xOBNjRdr1elk7ngEPa3wGOn');

        // 读取本地录音文件
        let voice = fs.readFileSync('../assets/recorder.wav');

        let voiceBase64 = new Buffer(data);

        // 识别本地语音文件
        client.recognize(voiceBase64, 'pcm', 16000).then(function (result) {
            console.log('语音识别本地音频文件结果: ' + JSON.stringify(result));
            let jsonData = JSON.parse(JSON.stringify(result));
            console.log(jsonData);
            if (jsonData.err_msg !== 'success.') {
                resTxt = '录音出错，请重新识别';
                ws.send(resTxt);
            } else {
                resTxt = jsonData.result;
                //console.log(resTxt);
                ws.send(resTxt[0]);
            }
        }, function (err) {
            console.log(err);
            ws.send(err);
        });
    })
    //ws.send(resTxt);

    ws.on('error', error => {
        console.log('Error:' + error);

    })
    ws.on('close', () => {
        console.log('Websocket is closed');
    })
})

// WebSocket服务器断开
wss.on('disconnection', ws => {
    ws.on('message', msg => {
        console.log('server recived msg:' + msg);
    })
})