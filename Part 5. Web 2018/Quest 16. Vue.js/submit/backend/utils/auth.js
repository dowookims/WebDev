const jwt = require('jsonwebtoken');

const auth = {}

auth.makeToken = (userId, nickname) => {
    return jwt.sign(
        {
            id: userId,
            nickname
        },
        "hithere",
        {
            expiresIn: '7d',
            issuer: 'knowre.dev',
            subject: 'userInfo'
        }
    )
};

auth.verifyToken = (token) => {
    return jwt.verify(token, "hithere")
}

module.exports = auth;