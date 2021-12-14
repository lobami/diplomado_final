const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const Promise = require('bluebird');
const expect = chai.expect;

chai.use(chaiHttp);

describe('operation check', () => {
    let req, res, next, agent;




    it('check a sum', done => {
        agent = chai.request.agent(server);

        agent
            .get('/auth')
            .then(({ body: { apiKey } }) => {
                return Promise.all([
                    agent
                        .post('/operations/sum')
                        .set('x-api-key', apiKey)
                        .send({ 'first': 4, 'second': 2 })
                ])
            })
            .then(data => {
                data[0].body.should.eql({ result: 6 });

                done();
            })
    });

    it('check a substract', done => {
        agent = chai.request.agent(server);

        agent
            .get('/auth')
            .then(({ body: { apiKey } }) => {
                return Promise.all([
                    agent
                        .post('/operations/substract')
                        .set('x-api-key', apiKey)
                        .send({ 'first': 4, 'second': 2 })
                ])
            })
            .then(data => {
                data[0].body.should.eql({ result: 2 });

                done();
            })
    });

    it('check a divide', done => {
        agent = chai.request.agent(server);

        agent
            .get('/auth')
            .then(({ body: { apiKey } }) => {
                return Promise.all([
                    agent
                        .post('/operations/divide')
                        .set('x-api-key', apiKey)
                        .send({ 'first': 4, 'second': 2 })
                ])
            })
            .then(data => {
                data[0].body.should.eql({ result: 2 });

                done();
            })

    });

    it('check a multiply', done => {
        agent = chai.request.agent(server);

        agent
            .get('/auth')
            .then(({ body: { apiKey } }) => {
                return Promise.all([
                    agent
                        .post('/operations/multiply')
                        .set('x-api-key', apiKey)
                        .send({ 'first': 4, 'second': 2 })
                ])
            })
            .then(data => {
                data[0].body.should.eql({ result: 8 });

                done();
            })


    })


});


