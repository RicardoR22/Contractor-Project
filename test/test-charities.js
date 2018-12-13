// test-charities.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const Charity = require('../models/charity');

chai.use(chaiHttp);

const sampleCharity =     {
    "charityName" : "Test Charity",
    "donationAmount" : 100,
    "date" : { type: Date, default: Date.now}
}

describe('Charities', ()  => {

  // TEST INDEX
  it('should index ALL reviews on / GET', (done) => {
    chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });

  // TEST NEW
 it('should display new form on /charities/new GET', (done) => {
   chai.request(server)
     .get(`/charities/new`)
       .end((err, res) => {
         res.should.have.status(200);
         res.should.be.html
         done();
       });
 });
  // TEST CREATE
  // TEST SHOW
it('should show a SINGLE charity on /charities/<id> GET', (done) => {
  var charity = new Charity(sampleCharity);
  charity.save((err, data) => {
    chai.request(server)
      .get(`/charities/${data._id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
  });
});
  // TEST EDIT
  // TEST UPDATE
  // TEST DELETE
});
