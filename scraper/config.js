const user = {
    secret: 'HzUGKTc7JVY7yys7IGi67jJBkzfoT4bNUIIk2odAmDDlHjaHoPSL05FnXSuAqp1q',
    id: 'f8d39787dbdd491bb11924891241c97c',
    password: 'Nadal2010',
    email: 'poette.theo@gmail.com'
}

const config = {
    user: user,
    version: '2019-08-22',
    device: '08a6ddf3-b9c3-4ef4-b98b-0a1c8a754a57',
    agent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.112 Safari/535.1'
}

class token {
    constructor(config) {
        this.config = config;
    }

    get_token() {
        rp({
            uri: `https://sync.bankin.com/v2/authenticate`,
            method: 'POST',
            headers: {
                'User-Agent': this.config.agent,
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Bankin-Version': this.config.version,
                'Bankin-Device': this.config.device,
                'Client-id': this.config.user.id,
                'Client-secret': this.config.user.secret
            },
            body: {
                'client-secret': this.config.user.secret,
                'client-id': this.config.user.id,
                'email': this.config.user.email,
                'password': this.config.user.password
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
    }
}

token = new token(config);

module.exports = Object.freeze({
    config: config,
    auth_token: token
})
//module.exports = config, token;