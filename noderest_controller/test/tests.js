var server = require('../app.js');
var expect = require('chai').expect;
var request = require('request');

describe('Testing Box', function() {

  it('should assert the volume of the Box', function() {
    console.log("cnjsacn");
  })

})


describe('server response', function () {
  before(function () {
    server.listen(3002);
  });
  it('Check server is open', function (done){
    request.get('http://localhost:3002', function (err, res, body){
    //console.log(res);
    expect(res.statusCode).to.equal(200);
    //expect(res.body).to.equal('wrong header');
    done();
    });
  });
});
