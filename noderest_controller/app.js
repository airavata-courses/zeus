var express = require('express');
var http = require('http');
var  path = require('path');
var mysql = require('mysql');
var bodyParser=require("body-parser");
const importer = require('node-mysql-importer')
var request = require('request')
var MYSQLCONNECTION = require('./constants');
const zk = require('node-zookeeper-client')
var client;
var port='3001'
var app = express();
var passport = require('passport');
var auth = require('./auth');
auth(passport);
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'session',
    keys: ['123']
}));
app.use(cookieParser());
var url = '149.165.170.230:2181';
console.log("Controller is running at 3001");

app.listen(port);

app.get('/',function(req,res){
    return res.render('index');    
});

app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.email']
}));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => { 
        req.session.token = req.user.profile.emails[0].value;
        res.redirect('/home');
    }
);


app.get('/login',function(req,res){
    return res.render('index');    
});

app.post('/login', function(req,res){
    var email= req.body.uname;
    var password = req.body.psw;
    client = zk.createClient(url, {retries: 2});
    client.once('connected', function () {
        console.log('Connected to ZooKeeper.');
        client.getChildren(
            '/zeus/node',
            function (event) {
                console.log('Got watcher event: %s', event);
            },
            function (error, children, stat) {
                if (error) {
                    console.log(
                        'Failed to list children of %s due to: %s.',
                        path,
                        error
                    );
                    return;
                }
                console.log('Children of %s are: %j.', path, children);
                var randomNodeInstance = children[Math.floor(Math.random()*children.length)];        
                var tmp = '/zeus/node/'+randomNodeInstance;
                client.getData(tmp, function(error, data){
                    if(error){
                        console.log("error getting data from zookeeper");
                    }else{
                        var url = JSON.parse(data.toString('utf8'));
                        var randomNodeInstance = url['host']+":"+url["port"];
                        var urlnode1='http://'+randomNodeInstance+'/login';
                        console.log(urlnode1);
                        request.post(
                            urlnode1,
                            // 'http://localhost:3050/login',
                            { json: { 
                                email: req.body.uname,
                                password: req.body.psw
                             } },
                            function (error, response, body) {
                                if (response.body.code == 200) {
                                    req.session.token = req.body.uname;
                                    res.redirect('/home');
                                }
                                else{
                                    res.send("Incorrect login");
                                }
                            }
                        );
                    }
                });
            }
        );
    });
     
    client.connect();
    
});

app.get('/logout',function(req, res){
    req.session = null;  
    res.redirect('/');   
}); 


app.get('/addQueue', function(req, res){   
    
    if (!req.session.token) {
        res.redirect('/');
    }
    else{
        console.log("Zookeeper connection code");
        client = zk.createClient(url, {retries: 2})  // Connect ZK
        
        var randomJavaInstance = "";
        client.once('connected', function () {
            client.getChildren('/zeus/java',function(error, data){
                if(error){
                    console.log("error");
                }else{
                    randomJavaInstance = data[Math.floor(Math.random()*data.length)];        
                    var tmp = '/zeus/java/'+randomJavaInstance;
                    client.getData(tmp, function(error, data){
                        if(error){
                            console.log("error getting data from zoo");
                        }else{
                            randomJavaInstance = data.toString('utf8');
                            var urljava1='http://'+randomJavaInstance+'/search/video/';
                            console.log(urljava1 + req.session.token + '/' + req.query.category);
                            request({
                                method: 'GET',
                                // url: 'http://localhost:8090/search/video/'+req.query.userId + '/' + req.query.category,
                                url: urljava1 + req.session.token + '/' + req.query.category,

                            }, function (err, resp) {
                                if (err) return console.error(err.message);
                            });
                        }
                    });
                }
            });
        });
        client.connect();
        res.send("ok");
    }
});

app.get('/signup',function(req,res){
    return res.render('signup');
});


app.post('/signup', function(req,res){
    var email= req.body.uname;
    var password = req.body.psw;
    console.log("Zookeeper connection code");
    client = zk.createClient(url, {retries: 2})  // Connect ZK
    var randomNodeInstance = "";
    client.once('connected', function () {
        console.log('Connected to ZooKeeper.');
        client.getChildren('/zeus/node',function(error, data){
            if(error){
                console.log("error");
            }else{
                randomNodeInstance = data[Math.floor(Math.random()*data.length)];        
                var tmp = '/zeus/node/'+randomNodeInstance;
                client.getData(tmp, function(error, data){
                    if(error){
                        console.log("error getting data from zoo");
                    }else{
                        var url = JSON.parse(data.toString('utf8'));
                        randomNodeInstance = url['host']+":"+url["port"];
                        var urlnode2='http://'+randomNodeInstance+'/signup';
                        console.log(urlnode2);
                        request.post(
                            // 'http://localhost:3050/signup',
                            urlnode2,
                            { 
                                json: { 
                                    "EMAIL":req.body.email,
                                    "PASSWORD":req.body.password,
                                    "PHONENO":req.body.PhoneNo
                                }
                            },
                            function (error, response, body) {
                                console.log(response.body.code);
                                if (response.body.code == 200) {
                                    res.redirect('/login');
                                }
                                else{
                                    res.send("Signup not successful");
                                }
                            }
                        );
                        
                    }
                });
            }
        });
       
    });
    client.connect();
    
});

app.get("/home", function(req, response){
    // console.log(req.session);
    if (req.session.token) {
        response.cookie('token', req.session.token);
        console.log(req.session.token);
        response.render('home');
    } else{
        response.redirect('/');
    }
    
});

app.get('/getSearchVideos', function(req, res){
    if (!req.session.token) {
        res.redirect('/');
    }
    else{
        console.log("Zookeeper connection code");
        client = zk.createClient(url, {retries: 2})  // Connect ZK
        console.log("Zookeeper connection");
        var randomJavaInstance = "";
        client.once('connected', function () {
            client.getChildren('/zeus/java',function(error, data){
                if(error){
                    console.log("error");
                }else{
                    randomJavaInstance = data[Math.floor(Math.random()*data.length)];        
                    var tmp = '/zeus/java/'+randomJavaInstance;
                    client.getData(tmp, function(error, data){
                        if(error){
                            console.log("error getting data from zoo");
                        }else{
                            randomJavaInstance = data.toString('utf8');
                            var urljava2='http://'+randomJavaInstance+'/search/v1/';
                            console.log(urljava2 + req.query.data);
                            request({
                                method: 'GET',
                                // url: 'http://localhost:8090/search/v1/'+req.query.data
                                url: urljava2 + req.query.data
                            }, function (err, resp) {
                                if (err) return console.error(err.message);
                            
                                // console.log(resp.body);
                                res.header("Access-Control-Allow-Origin", "*");
                                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                                res.setHeader('Content-Type', 'application/json');
                                // console.log(JSON.stringify(resp.body));
                                res.send(JSON.stringify(resp.body));
                            });

                        }
                    });
                }
            });
        });
        client.connect();
    }
}); 

app.get('/getVideos', function(req, res){
    if (!req.session.token) {   
        res.redirect('/');
    }
    else{
        console.log("Zookeeper connection code");
        client = zk.createClient(url, {retries: 2})  // Connect ZK
        client.connect();
        var randomPythonInstance = "";
        client.once('connected', function () {
            client.getChildren('/zeus/python',function(error, data){
                if(error){
                    console.log("error");
                }else{
                    randomPythonInstance = data[Math.floor(Math.random()*data.length)];        
                    var tmp = '/zeus/python/'+randomPythonInstance;
                    client.getData(tmp, function(error, data){
                        if(error){
                            console.log("error getting data from zoo");
                        }else{
                            randomPythonInstance = data.toString('utf8');
                            var urlpython='http://'+randomPythonInstance+'/getVideos';
                            console.log(urlpython);
                            request({
                                method: 'GET',
                                // url: 'http://localhost:4000/getVideos',
                                url: urlpython,
                                
                            }, function (err, resp) {
                                if (err) return console.error(err.message);
                                res.header("Access-Control-Allow-Origin", "*");
                                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                                res.setHeader('Content-Type', 'application/json');
                                res.send(JSON.stringify(resp.body));
                            });
                        }
                    });
                }
            });
        });
        client.connect();
    }
}); 

app.get('/playVideo',function(req, res){
    if (!req.session.token) {
        res.redirect('/');
    }else{
        return res.render('playvideo',{ url: req.query.url}); 
    }
}); 

app.get('/getRecommendations', function(req, res){
    if (!req.session.token) {
        res.redirect('/');
    }
    else{
        console.log("Testing Python for recommendations")
        console.log("Zookeeper connection code");
        client = zk.createClient(url, {retries: 2})  // Connect ZK
        var randomPythonInstance = "";
        client.once('connected', function () {
            client.getChildren('/zeus/python',function(error, data){
                if(error){
                    console.log("error");
                }else{
                    randomPythonInstance = data[Math.floor(Math.random()*data.length)];        
                    var tmp = '/zeus/python/'+randomPythonInstance;
                    client.getData(tmp, function(error, data){
                        if(error){
                            console.log("error getting data from zoo");
                        }else{
                            randomPythonInstance = data.toString('utf8');
                            var urlpython='http://'+randomPythonInstance+'/getRecommendations';
                            console.log(urlpython);
                            request({
                                method: 'GET',
                                // url: 'http://149.165.170.21:4000/getRecommendations',
                                url: urlpython,
                                json: { 
                                    email: req.session.token
                                },
                            }, function (err, resp) {
                                if (err) return console.error(err.message);
                                res.header("Access-Control-Allow-Origin", "*");
                                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                                res.setHeader('Content-Type', 'application/json');
                                // console.log(JSON.stringify(resp.body))
                                res.send(JSON.stringify(resp.body));
                            });
                        }
                    });
                }
            });
        });
        client.connect();
    }
});


module.exports = app;