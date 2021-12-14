const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const Promise = require('bluebird');
const expect = chai.expect;

chai.use(chaiHttp);

describe('shipment check', () => {
    let req, res, next, agent;




    it('Return a create shipment', done => {
        agent = chai.request.agent(server);

        agent
            .get('/auth')
            .then(({ body: { apiKey } }) => {
                return Promise.all([
                    agent
                        .post('/shipment')
                        .set('x-api-key', apiKey)
                ])
            })
            .then(data => {
                expect(['address', 'price', 'name', 'email']).to.deep.equal(Object.keys(data[0].body))

                done();
            })
    });

    it('Return a ramdon address in status endpoint', done => {
        agent = chai.request.agent(server);

        agent
            .get('/auth')
            .then(({ body: { apiKey } }) => {
                return Promise.all([
                    agent
                        .post('/shipment/status')
                        .set('x-api-key', apiKey)
                ])
            })
            .then(data => {
                expect(['address']).to.deep.equal(Object.keys(data[0].body))

                done();
            })
    });
});


