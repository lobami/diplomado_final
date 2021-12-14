//deberas de utilizar faker para generar los datos
const { fake } = require('faker');
const faker = require('faker');

module.exports = {
    createShipment: function (req, res) {
        //debera de simular un envio con dirección un precio y una persona con sus datos
        res.status(201).send({ address: faker.address.streetAddress(), price: faker.commerce.price(), name: faker.name.findName(), email: faker.internet.email()});
    },
    changeStatus: function (req, res) {
        //Debera de retornar una dirección random
        // codigo de respuesta 201
        // data la direcciòn random
        res.status(201).send({ address: faker.address.streetAddress()});
    },
};
