var express = require('express');
var router = express.Router();
var shipmentController = require('../controllers/shipment.controller');
var middleware = require('../middleware');


//router.use(middleware);

router
    .post('/', shipmentController.createShipment)
    .post('/status', shipmentController.changeStatus);

module.exports = router;
