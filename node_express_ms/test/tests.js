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
  });

});

describe('server response', function () {
  
  before(function () {
    // console.log("111111"+server);
    a=server.listen(3003);
  });
  it('Check server is open', function (done){
    request.get('http://localhost:3003', function (err, res, body){
    // console.log(res);
    expect(res.statusCode).to.equal(200);
    //expect(res.body).to.equal('wrong header');
    done();
    });
  });
  after(function() {
    // runs after all tests in this block
    console.log("cdnskc");
    a.close();
  });

});

