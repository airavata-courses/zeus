// Testing automated docker build
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
    if (req.session.token) {
        console.log("fixing bug");
        // res.cookie('token', req.session.token);
        // console.log(req.session.token);
        res.render('home');
    } else{
        console.log("fixing bug else");
        res.render('index');
    }
    // return res.render('index');  

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

    if (req.session.token) {
        console.log("fixing bug");
        // response.cookie('token', req.session.token);
        // console.log(req.session.token);
        res.render('home');
    } else{
        console.log("fixing bug else");
        res.render('index');
    }
    // return res.render('index');    
});

app.post('/login', function(req,res){
    var email= req.body.uname;
    var password = req.body.psw;
    request.post(
        //urlnode1,
         'http://js-170-230.jetstream-cloud.org:30003/login',
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
       
        request({
            method: 'GET',
            url: 'http://js-170-230.jetstream-cloud.org:30006/search/video/'+req.session.token + '/' + req.query.category,
            // url: 'http://149.165.168.221:30006/search/video/'+req.query.userId + '/' + req.query.category,
            // url: urljava1 + req.session.token + '/' + req.query.category,

        }, function (err, resp) {
            if (err) return console.error(err.message);
        });
        res.send("ok");
    }
});

app.get('/signup',function(req,res){
    return res.render('signup');
});


app.post('/signup', function(req,res){
    var email= req.body.uname;
    var password = req.body.psw;
   
    request.post(
        'http://js-170-230.jetstream-cloud.org:30003/signup',
        // urlnode2,
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
        request({
            method: 'GET',
            url: 'http://js-170-230.jetstream-cloud.org:30006/search/v1/'+req.query.data
            // url: urljava2 + req.query.data
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

app.get('/getVideos', function(req, res){
    
    if (!req.session.token) {   
        res.redirect('/');
    }
    else{        
        request({
            method: 'GET',
            url: 'http://js-170-230.jetstream-cloud.org:30005/getVideos',
            // url: urlpython,
            
        }, function (err, resp) {
            if (err) return console.error(err.message);
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(resp.body));
        });
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
        request({
            method: 'GET',
            url: 'http://js-170-230.jetstream-cloud.org:30005/getRecommendations',
            // url: urlpython,
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


module.exports = app;