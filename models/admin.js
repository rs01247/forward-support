module.exports = function (sequelize, DataTypes) {
    var Admins = sequelize.define("Admins", {
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pecialize:
        {
            type: DataTypes.STRING,
            allowNull: false
        }

    });

    return Admins;
};