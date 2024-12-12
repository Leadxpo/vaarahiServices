const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const ticketsModel = Sequelize.define('tickets',  //compliants and feedBacks
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

            order_id: { type: DataTypes.STRING, allowNull: false },

            ticket_mode: { type: DataTypes.STRING, allowNull: true },

            user_id: { type: DataTypes.STRING, allowNull: false },

            user_name: { type: DataTypes.STRING, allowNull: false },

            description: { type: DataTypes.STRING, allowNull: true },

            reply: { type: DataTypes.STRING, allowNull: true },

            issuePic: { type: DataTypes.STRING, allowNull: true },

            replay_date_time: { type: DataTypes.STRING, allowNull: true },

            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                onUpdate: DataTypes.NOW,
            },
        },
        {
            timestamps: true,
            tableName: 'tickets',
            underscored: true // Use snake_case for column names if you prefer
        }

    );
    return ticketsModel;

}

