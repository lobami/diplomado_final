module.exports = {
    sum: function (req, res) {
        let first = req.body.first
        let second = req.body.second
        let operation = parseFloat(first) + parseFloat(second)
        res.status(201).send({ result: operation});
    },

    substract: function (req, res) {
        let first = req.body.first
        let second = req.body.second
        let operation = parseFloat(first) - parseFloat(second)
        res.status(201).send({ result: operation});
    },

    multiply: function (req, res) {
        let first = req.body.first
        let second = req.body.second
        let operation = parseFloat(first) * parseFloat(second)
        res.status(201).send({ result: operation});
    },

    divide: function (req, res) {
        let first = req.body.first
        let second = req.body.second
        let operation = parseFloat(first) / parseFloat(second)
        res.status(201).send({ result: operation});
    }
};
