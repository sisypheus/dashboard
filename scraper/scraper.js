const rp = require('request-promise');
const config = require('./config').config;
const get_token = require('./auth');

get_token.then((token) => {
    rp({
        uri: `https://sync.bankin.com/v2/accounts?limit=200&client_id=${config.user.id}&client_secret=${config.user.secret}`,
        method: 'GET',
        headers: {
            'User-Agent': config.agent,
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Bankin-Version': config.version,
            'Bankin-Device': config.device,
            'Client-id': config.user.id,
            'Client-secret': config.user.secret,
            'Authorization': 'Bearer ' + token
        },
        body: {
            'client-secret': config.user.secret,
            'client-id': config.user.id,
            'email': config.user.email,
            'password': config.user.password
        },
        parameters: {
            'limit': 200,
            'client-id': config.user.id,
            'client_secret': config.user.secret
        },
        json: true
    })
    .then((response) => {
        console.log((response.status));
        //return response;
    })
    .catch((err) => {
        console.log(err);
    });
    //console.log(token);
});