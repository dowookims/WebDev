const jwt = require('jsonwebtoken');

module.exports =  (userId, nickname) => {
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
