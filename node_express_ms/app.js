var express = require('express');
var http = require('http');
var  path = require('path');
var app = express();
var mysql      = require('mysql');
var bodyParser=require("body-parser");
var MYSQLCONNECTION = require('./constants');
var port='3051';
// const zookeeper = require('./zk.js')
let count=0;
app.set('port', process.env.PORT || 8080);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
// zookeeper.zkCreateClient(port);

app.listen(port);

app.get('/',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return res.send('NodeExpress endpoint');
    // return res.send('Aravind likes girls');    
});
// count++;
app.get('/getRequestHitCount',function(req,res){
    return res.send({"count":count});    
});


app.post('/login',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    count=count+1;
    // console.log("------------------------");
    // console.log(count);
    
    var connection = mysql.createConnection({
        host     : '149.165.170.230',
        user     : MYSQLCONNECTION.MYSQL_USERNAME,
        password : MYSQLCONNECTION.MYSQL_PASSWORD,
        database : 'zeus_node'
      });
    connection.connect();
    
    console.log(req.body);
    var email= req.body.email;
    var password = req.body.password;
    console.log(email);
    console.log(password);
    connection.query('SELECT * FROM usertable WHERE EMAIL = ?',[email], function (error, results, fields) {
    if (error) {
        res.send({
            "code":400,
            "failed":"error ocurred"
        })
        }
        else{
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

app.post('/signup',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var connection = mysql.createConnection({
        host     : '149.165.170.230',
        user     : MYSQLCONNECTION.MYSQL_USERNAME,
        password : MYSQLCONNECTION.MYSQL_PASSWORD,
        database : 'zeus_node'
      });
    connection.connect();
    
    
    var users={
        "EMAIL":req.body.EMAIL,
        "PASSWORD":req.body.PASSWORD,
        "PHONENO":req.body.PHONENO
    }
    
    connection.query('INSERT INTO usertable SET ?',users, function (error, results, fields) {
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

// function exists(client, path) {
//     client.exists(
//         path,
//         function (event) {
//             console.log('Got event: %s.', event);
//             //exists(client, path);
//         },
//         function (error, stat) {
//             if (error) {
//                 console.log(
//                     'Failed to check existence of node: %s due to: %s.',
//                     path,
//                     error
//                 );
//                 return false;
//             }

//             if (stat) {
//                 console.log(
//                     'Node: %s exists and its version is: %j',
//                     path,
//                     stat.version
//                 );

//                 return true;
//             } else {
//                 console.log('Node %s does not exist.', path);
//                 return false;
//             }
//         }
//     );
// }

// function listChildren(client, path) {
//     client.getChildren(
//         path,
//         function (event) {
//             console.log('Got watcher event: %s', event);
//             listChildren(client, path);
//         },
//         function (error, children, stat) {
//             if (error) {
//                 console.log(
//                     'Failed to list children of node: %s due to: %s.',
//                     path,
//                     error
//                 );
//                 return;
//             }

//             console.log('Children of node: %s are: %j.', path, children);
//             console.log("check this");
//             for(var i=0;i<children.length;i++){
//                 var path2 = '/zeus/node/'+children[i];
//                 console.log("bsja");
//                 console.log(path2);
//                 getData(client,path2);
//             }
//             return children;
//         }
//     );
// }

// function getData(client, path) {
//     client.getData(
//         path,
//         function (event) {
//             console.log('Got event: %s', event);
//             getData(client, path);
//         },
//         function (error, data, stat) {
//             if (error) {
//                 console.log('Error occurred when getting data: %s.', error);
//                 return;
//             }

//             console.log(
//                 'Node: %s has data: %s, version: %d',
//                 path,
//                 data ? data.toString() : undefined,
//                 stat.version
//             );
//         }
//     );
// }

module.exports=app;


