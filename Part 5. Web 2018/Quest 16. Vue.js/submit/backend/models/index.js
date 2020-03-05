const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.UserWorkingState = require('./userWorkingState')(sequelize, Sequelize);

db.User.hasOne(db.UserWorkingState);
db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

module.exports = db;
