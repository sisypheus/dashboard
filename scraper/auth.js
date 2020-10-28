const rp = require('request-promise');
const config = require('./config').config;

const get_token = new Promise((resolve, reject) => {
    rp({
        uri: `https://sync.bankin.com/v2/authenticate`,
        method: 'POST',
        headers: {
            'User-Agent': config.agent,
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Bankin-Version': config.version,
            'Bankin-Device': config.device,
            'Client-id': config.user.id,
            'Client-secret': config.user.secret
        },
        body: {
            'client-secret': config.user.secret,
            'client-id': config.user.id,
            'email': config.user.email,
            'password': config.user.password
        },
        json: true
    })
    .then((response) => {
        resolve(response.acces_token);
    })
    .catch((err) => {
        reject(err);
    });
});

module.exports = get_token;