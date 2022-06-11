var express = require('express');
var expressSession = require('express-session');
var router = express.Router();
const bodyParser = require("body-parser")
var cookieParser = require('cookie-parser');
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}))

router.use(expressSession({
    resave: false,
    saveUninitialized: true,
    secret: 'mySessionKey'
}));
router.use(cookieParser());

var cookieExpir = 604800 * 1000; // cookie超时时间1周
var cookieKey = 'myCookieKey';

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
// 可能会修改，根据自己的要求来做
const dbName = 'myapp';

/* 首页路径 */
router.get('/', function (req, res) {
    res.render('index', {
        title: 'Express'
    });
});

router.post('/register', function (req, res) {

    // console.log(req.body);

    var postData = req.body.data;

    MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function (err, client) {

        console.log('数据库已连接');
        //看是否错误
        if (err) {
            console.log(err)
        }

        var db = client.db(dbName);
        //插入自己的信息
        db.collection("users").insertOne(postData, function (err, result) {

            if (err) {
                console.log(err)
            }


            // 查询所有数据
            db.collection("users").find({}).toArray(function (err, data) {
                if (err) {
                    console.log(err)
                }

                client.close();
                console.log('数据库已关闭');

                console.log(data);
                res.send(data);
            });

        });

    });

});

router.get('/r', function (req, res) {
    const client = new MongoClient(url, {
        useUnifiedTopology: true
    });

    client.connect(function (err) {
        if (err) {
            console.log(err)
        }

        const db = client.db(dbName);
        console.log('数据库已连接');

        const collection = db.collection('students');

        // 查询所有数据
        collection.find({}).toArray(function (err, data) {
            if (err) {
                console.log(err)
            }

            client.close();
            console.log('数据库已关闭');

            console.log(data);
            res.send(data);
        });

    });

});

router.post('/u', function (req, res) {

    // console.log(req.body);

    var queryCode = req.body.data.学号;
    var queryName = req.body.data.姓名;

    MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function (err, client) {

        console.log('数据库已连接');

        if (err) {
            console.log(err)
        }

        var db = client.db(dbName);

        db.collection("students").updateOne({
            '学号': queryCode
        }, {
            $set: {
                '姓名': queryName
            }
        }, function (err, result) {

            if (err) {
                console.log(err)
            }

            // 查询所有数据
            db.collection("students").find({}).toArray(function (err, data) {
                if (err) {
                    console.log(err)
                }

                client.close();
                console.log('数据库已关闭');

                console.log(data);
                res.send(data);
            });

        });

    });

});

router.post('/d', function (req, res) {

    // console.log(req.body);

    var queryCode = req.body.data.学号;

    MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function (err, client) {

        console.log('数据库已连接');

        if (err) {
            console.log(err)
        }

        var db = client.db(dbName);

        db.collection("students").deleteOne({
            '学号': queryCode
        }, function (err, result) {

            if (err) {
                console.log(err)
            }

            // 查询所有数据
            db.collection("students").find({}).toArray(function (err, data) {
                if (err) {
                    console.log(err)
                }

                client.close();
                console.log('数据库已关闭');

                console.log(data);
                res.send(data);
            });

        });

    });

});


/* POST login */
router.post('/login', function (req, res) {
    var resLoginSuccess = false;

    //console.log(req.body)

    if (req.body.用户名 && req.body.密码) {

        MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function (err, client) {
            console.log('数据库已连接');

            if (err) {
                console.log(err)
            }

            const db = client.db(dbName);

            db.collection('users').findOne({
                'username': req.body.用户名,
                'password': req.body.密码
            }, function (err, data) {
                if (err) {
                    console.log(err)
                }

                client.close();
                console.log('数据库已关闭');

                //console.log(data);

                if (data) {

                    req.session.login = 1;
                    req.session.loginUsername = req.body.用户名;
                    req.session.loginKey = cookieKey;

                    res.cookie('login', 1, {
                        maxAge: cookieExpir
                    });
                    res.cookie('loginUsername', req.body.用户名, {
                        maxAge: cookieExpir
                    });
                    res.cookie('loginKey', cookieKey, {
                        maxAge: cookieExpir
                    });

                    resLoginSuccess = 1;
                } else {
                    resLoginSuccess = 0;
                }

                res.send({
                    'loginSuccess': resLoginSuccess
                });

            });

        });

    } else {
        res.send({
            'loginSuccess': resLoginSuccess
        });
    }

});

/* POST logout */
router.post('/logout', function (req, res) {
    var resLogoutSuccess = 0;

    if (req.body.注销) {
        delete req.session.login;
        delete req.session.loginUsername;
        delete req.session.loginKey;

        res.clearCookie('login');
        res.clearCookie('loginUsername');
        res.clearCookie('loginKey');

        resLogoutSuccess = 1;
    } else {
        resLogoutSuccess = 0;
    }

    res.send({
        'logoutSuccess': resLogoutSuccess
    });
});




module.exports = router;