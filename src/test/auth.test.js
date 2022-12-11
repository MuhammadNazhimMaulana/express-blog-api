// Preparation For Test
const chai = require('chai');
const chaiHttp = require('chai-http');
let should = chai.should();
const app = require('../app');

// Token After Login
let token = '';

// Starting Test
chai.use(chaiHttp);

// Start of Auth Test
describe('This is Auth Test', () => {
  /*
  * Register Test
  */
  describe('Register Test', () => {
    it('Register', (done) => {
      let user = {
          username: "Cesar",
          email: "cesar@gmail.com",
          password: "demodemo123"
      }
      chai
        .request(app)
        .post('/auth/')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data[0].should.be.a('object');
          res.body.data[0].should.have.property('username');
          res.body.data[0].should.have.property('email');
          res.body.data[0].should.have.property('password');
          done();
        });
    });
  });
  
  /*
  * Login Test
  */
  describe('Login Test', () => {
    it('Login', (done) => {
      let user = {
          email: "cesar@gmail.com",
          password: "demodemo123"
      }
      chai
        .request(app)
        .post('/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('username');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('password');
          res.body.data.should.have.property('token');
  
          // Add Token
          token = res.body.data.token;
  
          done();
        });
    });
  });
  
  /*
  * Logout Test
  */
  describe('Logout Test', () => {
    it('Logout', (done) => {
      let user = {
          email: "cesar@gmail.com",
          password: "demodemo123"
      }
      chai
        .request(app)
        .post('/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('object');
  
          // Remove Token
          token = '';
          done();
        });
    });
  });
});
