const PAYMENT_FILE_PATH = 'payment-generated.txt';
const faker = require('faker');
const fs = require('fs');
const LINE_ENDING = require('os').EOL;

module.exports = {
    create: function (req, res) {
        const fd = fs.openSync(PAYMENT_FILE_PATH, 'a');
        fs.appendFileSync(fd, faker.commerce.price() + LINE_ENDING, 'utf8');
        res.status(201).send();
    },

    applyDiscount: function (req, res) {
        //debera de restar una cantidad a cada precio en payment-generated.txt
        fs.readFile(PAYMENT_FILE_PATH, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            let newValues = []
            let value = req.body.value
            async function logSetElements(original) {
                if (original != '' || original == null) {
                    var operation = parseFloat(original) - parseFloat(value)
                    await newValues.push(operation)
                    const fd = fs.openSync(PAYMENT_FILE_PATH, 'a');
                    fs.appendFileSync(fd, operation + LINE_ENDING, 'utf8');
                }

            }
            fs.writeFileSync(PAYMENT_FILE_PATH, '', function () { console.log('done') })
            new Set(data.split('\n')).forEach(logSetElements);
        });
        res.status(201).send({ message: "values updated"});
    },

    getPromos: function (req, res) {
        res.json([
            { name: "BUENFIN" },
            { name: "HOTSALE" },
            { name: "CYBERMONDAY" },
            { name: "BLACKFRIDAY" },
            { name: "PRIMEDAY" },
        ]);
    }
};
