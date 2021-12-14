var express = require('express');
var router = express.Router();
var tasksController = require('../controllers/tasks.controller');
var operationsController = require('../controllers/operations.controller');
var middleware = require('../middleware');


//router.use(middleware);

router
    .post('/sum', operationsController.sum)
    .post('/substract', operationsController.substract)
    .post('/multiply', operationsController.multiply)
    .post('/divide', operationsController.divide);

module.exports = router;
