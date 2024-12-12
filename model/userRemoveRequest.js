const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const userModel = Sequelize.define('userRemoveRequest',
        {
            id: { type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true },

            name: { type: DataTypes.STRING, allowNull: false },

            user_id: { type: DataTypes.STRING, allowNull: false},

            reason: { type: DataTypes.STRING, allowNull: true },
            
            date_time: { type: DataTypes.STRING, allowNull: true },
 
            status: { 
                type: DataTypes.STRING,
                defaultValue: "pending",
                validate: { 
                    isIn: [["pending", "accepted", "rejected"]]
                }, 
            },

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
            tableName: 'userRemoveRequest' 
        }

    );
    return userModel;

}

