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
    done();
    console.log("hj");
    });
  });
  after(function() {
    // runs after all tests in this block
    console.log("cdnskc");
    a.close();
  });

});

