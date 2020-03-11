module.exports = (req) => {
    if (!req.user) {
        throw Error('user is not exist')
    }
    return;
}