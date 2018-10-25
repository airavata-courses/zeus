var express = require('express');
var http = require('http');
var  path = require('path');
var app = express();
var mysql      = require('mysql');
var bodyParser=require("body-parser");
const importer = require('node-mysql-importer')
var request = require('request')
var MYSQLCONNECTION = require('./constants');

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// importer.config({
//     'host': 'localhost',
//     'user': MYSQLCONNECTION.MYSQL_USERNAME,
//     'password': MYSQLCONNECTION.MYSQL_PASSWORD
// });

// importer.importSQL('data.sql').then( () => {
//     console.log('all statements have been executed')
// }).catch( err => {
//     console.log(`error: ${err}`)
// });


console.log("Controller is running at 3001");


app.listen(3001);



app.get('/',function(req,res){
    return res.render('index');    
});

app.get('/login',function(req,res){
    //console.log("login");
    return res.render('index');    
});



app.post('/login',function(req,res){
	//console.log("cas");
    var email= req.body.uname;
    var password = req.body.psw;
    request.post(
        'http://localhost:3050/login',
        { json: { 
            email: req.body.uname,
            password: req.body.psw
         } },
        function (error, response, body) {
            if (response.body.code == 200) {
                res.redirect('/home');
            }
            else{
                res.send("Incorrect login");
            }
        }
    );
   
});

app.get('/logout',function(req, res){
    console.log("test");
    res.redirect('/login');
}); 


app.get('/addQueue', function(req, res){   
    
    
    request({
        method: 'GET',
        url: 'http://localhost:8090/search/video/'+req.query.userId + '/' + req.query.category
      }, function (err, resp) {
        if (err) return console.error(err.message);
    });
    res.send("ok");
});

app.get('/signup',function(req,res){
    return res.render('signup');

});

app.post('/signup',function(req,res){
    
    var email= req.body.uname;
    var password = req.body.psw;
    request.post(
        'http://localhost:3050/signup',
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
    response.render('home')
});

app.get('/getSearchVideos',function(req, res){
    
    request({
        method: 'GET',
        url: 'http://localhost:8090/search/v1/'+req.query.data
      }, function (err, resp) {
        if (err) return console.error(err.message);
      
        // console.log(resp.body);
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader('Content-Type', 'application/json');
        // console.log(JSON.stringify(resp.body));
        res.send(JSON.stringify(resp.body));

      });

}); 

app.get('/getVideos',function(req, res){
    
    request({
        method: 'GET',
        url: 'http://localhost:4000/getVideos',
      }, function (err, resp) {
        if (err) return console.error(err.message);
      
        // console.log(resp.body);
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader('Content-Type', 'application/json');
        // console.log(JSON.stringify(resp.body));
        res.send(JSON.stringify(resp.body));

      });

}); 

app.get('/playVideo',function(req, res){
    console.log(req.query.url);
    return res.render('playvideo',{ url: req.query.url}); 
}); 



module.exports = app;