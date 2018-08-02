module.exports = function (sequelize, DataTypes) {
    var Ticket = sequelize.define("Ticket", {
        employeeName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        summary: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        employeeDepartment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        priority:
        {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ticketCategory:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        status:
        {
            type: DataTypes.STRING,
            allowNull: false
        }

    });

    return Ticket;
};