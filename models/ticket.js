module.exports = function (sequelize, DataTypes) {
    var Ticket = sequelize.define("Ticket", {
        employeeName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        employeeEmail: {
            type: DataTypes.STRING,
            // validate: {
            //     isEmail: true
            // },
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
            type: DataTypes.STRING,
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
        },
        isOpen:
        {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        isInProgress:
        {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }

    });

    return Ticket;
};