const fs = require('fs');
const VALID_KEYS_PATH = __dirname + '/valid-keys.txt';
const utils = require('./test/utils');

module.exports = async function (req, res, next) {
    try {
        const keys = await utils.getKeysFromFile(VALID_KEYS_PATH);
        console.log('LAS KEYS DISPONIBLES: ', keys)
        const xApiKey = req.headers['x-api-key'];
        console.log('EL CODE!!!!! ', xApiKey)
        //console.log('LOS HEADERS!!!!', req)
        if(!xApiKey) return res.status(401).send();
        if(keys.includes(xApiKey)) return next();
        return res.status(401).send();
    } catch (error) {
        console.log('EL ERROR!!!!!!!!!!!!!!!!!! ', error)
        return res.status(401).send({
            error: "keys-notfound"
        });
    }
};
