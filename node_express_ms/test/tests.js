// var assert = require('assert');
// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1,2,3].indexOf(4), -1);
//     });
//   });
// });
var server = require('../app.js');
var expect = require('chai').expect;
var request = require('request');

describe('Testing Box', function() {

  it('should assert the volume of the Box', function() {
    console.log("cnjsacn");
  })

})


describe('server response', function () {
  // let server;
  // before(function () {
  //  var app = require('http');
  //  server=app.createServer();
  //  server.listen(3002);
  //   // server.listen(3002);
  // });
  before(function () {
    server.listen(3002);
  });
  it('Check server is open', function (done){
    request.get('http://localhost:3002', function (err, res, body){
    // console.log(res);
    expect(res.statusCode).to.equal(200);
    //expect(res.body).to.equal('wrong header');
    done();
    });
  });

});

