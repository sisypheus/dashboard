const user = {
    secret: process.env.USER_SECRET,
    id: process.env.USER_ID,
    password: process.env.USER_PASSWORD,
    email: process.env.USER_EMAIL
}

const config = {
    user: user,
    version: '2019-08-22',
    device: '08a6ddf3-b9c3-4ef4-b98b-0a1c8a754a57',
    agent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.112 Safari/535.1'
}

module.exports = Object.freeze({
    config: config
})