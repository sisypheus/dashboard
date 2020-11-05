const express = require('express');
const rp = require('request-promise');
const config = require('./config').config;
const get_token = require('./auth');

const PORT = process.env.PORT || 5000;

const app = express();

let balance = new Promise((resolve, reject) => {
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
                    console.log('here');
                    resolve(response.resources[i].balance);
                }
            }
        })
        .catch((err) => {
            reject(err);
        });
    });
});

balance.then((balance) => {
    console.log(balance);
})

app.get('/', (req, res) => {
    balance
    .then((balance) => {
        return balance;
    })
});

app.listen(PORT, () => {
    console.log('Server has started on port ' + PORT);
});