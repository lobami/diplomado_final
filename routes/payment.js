var express = require('express');
var router = express.Router();
var paymentController = require('../controllers/payment.controller');
var middleware = require('../middleware');


router.use(middleware);

router
    .get('/promos', paymentController.getPromos)
    .post('/discount', paymentController.applyDiscount)
    .get('/create', paymentController.create);

module.exports = router;
