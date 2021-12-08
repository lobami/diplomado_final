const chai = require('chai');
const chaiHttp = require('chai-http');
const path = require('path');
const server = require('../app');
const should = chai.should();
const sinon = require('sinon');
const payment = require('../controllers/payment.controller');
const keyStore = require('../key-store');
const PAYMENT_FILE_PATH = path.resolve('./payment-generated.txt');
const KEY_FILE = path.resolve('./valid-keys.txt');
const {Request, Response} = require('./mock');
const utils = require('./utils');
const {uniq} = require('lodash');
const Promise = require('bluebird');

chai.use(chaiHttp);

describe('payment check', () => {
    let req, res, next, agent;

    beforeEach((done) => {
        req = new Request();
        res = new Response();
        next = sinon.stub();
        utils.generatePaymentFile()
            .then(() => {
                done();
            })
    });

    afterEach((done) => {
        if (agent) {
            agent.close();
        }
        utils.removeFile(PAYMENT_FILE_PATH)
          .then(() => done() )
    });

    it('Should generate an random price', (done) => {
        payment.create(req, res);
        setTimeout(() => {
            utils.getFromFile(PAYMENT_FILE_PATH)
                .then(data => {
                    data.length.should.eql(1);
                    done();
                })
        }, 500);
    });

    it('Should generate 5 random prices', done => {
        let n = 10;
        for (let i = 0; i < n; i++) {
            payment.create(req, res);
        }
        setTimeout(() => {
            utils.getFromFile(PAYMENT_FILE_PATH)
                .then(data => {
                    data.length.should.eql(n);
                    const uniqKeys = uniq(data);
                    uniqKeys.length.should.eql(data.length);
                    done();
                })
        }, 500);
    });


    it('Should return 5 promo codes', done => {
        agent = chai.request.agent(server);
            agent
            .get('/auth')
            .then(({body: {apiKey}}) => {
                return Promise.all([
                    agent
                        .get('/payment/promos')
                        .set('x-api-key', apiKey)
                ])
                
            })
            .then(promos => {
                promos['0'].body.length.should.eql(5);
                done();
            })
    });
});


