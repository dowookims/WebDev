const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = (req, res, next) => {
    const clientToken = req.headers['x-access-token'];
    const userId = jwt.verify(clientToken, "hithere").id;
    const user = User.findOne({ where: { id: userId } })
    if (user) {
        next()
    } else {
        throw "User is not exist"
    }
}