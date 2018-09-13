var express = require('express');
var http = require('http');
var  path = require('path');
var app = express();
var mysql = require('mysql');
var bodyParser=require("body-parser");
var request = require('request');


app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
 

app.listen(3001)

app.get('/',function(req,res){
    return res.render('index');    
});

app.get('/login',function(req,res){
    return res.render('index');    
});

app.post('/login',function(req,res){
    
    var email= req.body.uname;
    var password = req.body.psw;
    request.post(
        'http://localhost:3050/login',
        { json: { 
            email: req.body.uname,
            password: req.body.psw
         } },
        function (error, response, body) {
            console.log(response.body.code);
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

app.get('/signup', function(req, res){
    res.render('signup');
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



