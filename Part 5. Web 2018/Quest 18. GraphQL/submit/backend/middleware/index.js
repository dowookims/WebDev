const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (token) {
        const userId = jwt.verify(token, "hithere").id;
        const user = User.findOne({ where: { id: userId }})
        if (user) {
            req.user = user.dataValues
        } else {
            throw "User is not exist"
        }   
    }
    next()
}