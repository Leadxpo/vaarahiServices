const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const notificationModel = Sequelize.define('notification',
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
           
            name: { type: DataTypes.STRING, allowNull: true },
           
            date_time: { type: DataTypes.STRING, allowNull: true },

            type: { type: DataTypes.STRING, validate: {
                isIn: [['user', 'deliveryStaff', 'all']] 
            },allowNull: true },

            subType: { type: DataTypes.STRING, validate: {
                isIn: [['all', 'user','deliveryStaff']] 
            },allowNull: true },

            description: { type: DataTypes.STRING, allowNull: true },

            user_id: { type: DataTypes.STRING, allowNull: true },

            Viewer: { type: DataTypes.JSON, defaultValue:[], allowNull: true },

            isView: { type: DataTypes.BOOLEAN, allowNull: true },

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
            tableName: 'notification'
        }

    );
    return notificationModel;

}

