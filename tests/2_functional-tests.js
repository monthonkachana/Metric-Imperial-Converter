const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('Functional Tests', function () {
    it('should convert a valid input such as 10L: GET request to /api/convert', function (done) {
        chai
            .request(server)
            .get('/api/convert?input=10L')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.isObject(res.body);
                assert.property(res.body, 'initNum');
                assert.property(res.body, 'initUnit');
                assert.property(res.body, 'returnNum');
                assert.property(res.body, 'returnUnit');
                assert.property(res.body, 'string');
                done();
            });
    });

    it('should convert an invalid input such as 32g: GET request to /api/convert', function (done) {
        chai
            .request(server)
            .get('/api/convert?input=32g')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.text, 'invalid unit');
                done();
            });
    });

    it('should convert an invalid number such as 3/7.2/4kg: GET request to /api/convert', function (done) {
        chai
            .request(server)
            .get('/api/convert?input=3/7.2/4kg')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.text, 'invalid number');
                done();
            });
    });

    it('should convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', function (done) {
        chai
            .request(server)
            .get('/api/convert?input=3/7.2/4kilomegagram')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.text, 'invalid number and unit');
                done();
            });
    });

    it('should convert with no number such as kg: GET request to /api/convert', function (done) {
        chai
            .request(server)
            .get('/api/convert?input=kg')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.isObject(res.body);
                assert.property(res.body, 'initNum');
                assert.property(res.body, 'initUnit');
                assert.property(res.body, 'returnNum');
                assert.property(res.body, 'returnUnit');
                assert.property(res.body, 'string');
                done();
            });
    });
});
