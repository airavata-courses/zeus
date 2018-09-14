var express = require('express');
var http = require('http');
var  path = require('path');
var app = express();
var mysql      = require('mysql');
var bodyParser=require("body-parser");
const importer = require('node-mysql-importer')



app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


importer.config({
    'host': 'localhost',
    'user': 'root',
    'password': 'root'
});

importer.importSQL('data.sql').then( () => {
    console.log('all statements have been executed')
}).catch( err => {
    console.log(`error: ${err}`)
});


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
    
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'zeus'
      });
    connection.connect();
    
    var email= req.body.uname;
    var password = req.body.psw;
    
    connection.query('SELECT * FROM USERTABLE WHERE EMAIL = ?',[email], function (error, results, fields) {
    if (error) {
        // console.log("error ocurred",error);
        res.send({
            "code":400,
            "failed":"error ocurred"
        })
        }
        else{
        console.log('The solution is: ', results);
        if(results.length >0){
            if(results[0].PASSWORD == password){
            res.redirect("/home");
            }
            else{
            res.send({
                "code":204,
                "success":"Email and password does not match"
                });
            }
        }
        else{
            res.send({
            "code":204,
            "success":"Email does not exits"
                });
        }
    }
    });
});

app.get('/logout',function(req, res){
    console.log("test");
    // req.session.destroy(function(){
      res.redirect('/login');
    // });
  }); 

// app.post('/logout',function(req, res){
//     console.log("test");
//     req.session.destroy(function(){
//       res.redirect('/login');
//     });
//   }); 






app.post('/signup',function(req,res){
    
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'admin',
        database : 'zeus'
      });
    connection.connect();
    
    

    var users={
        
        
        "EMAIL":req.body.email,
        "PASSWORD":req.body.password,
        "PHONENO":req.body.PhoneNo
        
       
    }
    
    connection.query('INSERT INTO USERTABLE SET ?',users, function (error, results, fields) {
    if (error) {
        // console.log("error ocurred",error);
        res.send({
            "code":400,
            "failed":"error ocurred"
        })
        }
        else{
            res.render('login.ejs');        
    }
    
    });
});


app.get("/home", function(req, response){
    var options = {
        host: 'localhost',
        port: 4000,
        path: '/getVideos',
        method: 'GET'
    };

    response.render('home')
});

