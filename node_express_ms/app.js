var express = require('express');
var http = require('http');
var  path = require('path');
var app = express();
var mysql      = require('mysql');
var bodyParser=require("body-parser");


app.set('port', process.env.PORT || 8080);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 

app.listen(3050)

app.get('/',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    return res.send('hello');    
});

app.post('/login',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'admin',
        database : 'zeus'
      });
    connection.connect();
    
    console.log(req.body);
    var email= req.body.email;
    var password = req.body.password;
    console.log(email);
    console.log(password);
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
                res.send({
                    "code":200,
                    "success":"Login success"
                    });
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
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send({
        "code":200,
        "success":"Logout success"
        });
  }); 

app.post('/signup',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'admin',
        database : 'zeus'
      });
    connection.connect();
    
    console.log(req.body.EMAIL);

    var users={
        "EMAIL":req.body.EMAIL,
        "PASSWORD":req.body.PASSWORD,
        "PHONENO":req.body.PHONENO
    }
    
    connection.query('INSERT INTO USERTABLE SET ?',users, function (error, results, fields) {
        console.log(results);
        if (error) {
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
            }
            else{
                res.send({
                    "code":200,
                    "success":"Sign Up success"
                });        
        }
    });
});




