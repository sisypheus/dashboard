const rp = require('request-promise');
const config = require('./config');

let auth_token = (() => {
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
        console.log((response.access_token));
        return response.access_token;
    })
    .catch((err) => {
        console.log(err);
    });
});

let html = (() => {
    console.log('zebi');
});

auth_token();