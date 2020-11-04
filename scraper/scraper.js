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
        for (let i = 0; response.resources[i]; i++) {
            if (response.resources[i].name == 'M. Poette Theo - Compte Cheque') {
                //console.log(response.resources[i].balance);
                return response.resources[i].balance;
            }
        }
    })
    .catch((err) => {
        console.log(err);
    });
});