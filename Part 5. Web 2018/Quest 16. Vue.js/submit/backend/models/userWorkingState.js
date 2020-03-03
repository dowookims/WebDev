module.exports = (sequelize, DataTypes) => {
    return sequelize.define('userWorkingState', {
        tabs: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        selectedTab: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        cursorLen: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    })
};