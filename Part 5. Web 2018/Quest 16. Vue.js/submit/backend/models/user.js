module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        id: {
            type: DataTypes.STRING(50),
            primaryKey: true,
        },
        nickname: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
    }, {
        indexes: [
            {
                unique: true,
                fields: ['id', 'nickname']
            }
        ]
    })
}