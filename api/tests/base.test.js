const chai = require('chai');
const should = chai.should();

chai.use(require('chai-http'));
chai.use(require('chai-things'));
chai.use(require('chai-like'));

const server = require('../index');

describe('Base application testing', () => {
    it('[Success] Should be able to access the API', (done) => {
        chai.request(server).get('/').end((err, res) => {
            if(err) {
                done(err);
            };
            res.should.have.a.status(200).and.a.nested.property('body.data').that.includes({
                app_name: 'deskshop-api',
                version: '1.0.0'
            });
            done();
        });
    });
    it('[Failure] Should not be able to access invalid paths', (done) => {
        chai.request(server).get('/invalidpath').end((err, res) => {
            if(err) {
                done(err);
            };
            res.should.have.a.status(404).and.a.nested.property('body.error').that.includes({
                type: 'NOT_FOUND_ERROR',
                code: 404
            });
            done();
        });
    });
});