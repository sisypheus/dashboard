const rp = require('request-promise');
const config = require('./config').config;
const get_token = require('./auth');

get_token.then((token) => {
    rp({
        uri: `https://sync.bankin.com/v2/accounts?limit=200`,
        method: 'GET',
        headers: {
            'User-Agent': config.agent,
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Bankin-Version': config.version,
            'Bankin-Device': config.device,
            'Client-id': config.user.id,
            'Client-secret': config.user.secret,
            'Authorization': 'Bearer ' + token,
            'referer': 'https://app2.bankin.com/'
        },
        json: true
    })
    .then((response) => {
        console.log(response.resources)
        return response;
    })
    .catch((err) => {
        console.log(err);
    });
});

function get_accounts() {
    
}