const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const requestModel = Sequelize.define('request',
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            
            request_type: { type: DataTypes.STRING,validate: {
                isIn: [["creditAmounttRequest", "DebitAmountRequest"]]
            }, allowNull: false },

            staff_id: { type: DataTypes.STRING, allowNull: false },

            order_id: { type: DataTypes.STRING, allowNull: true },

            total_amt: { type: DataTypes.FLOAT, allowNull: false },

            request_amt: { type: DataTypes.FLOAT, allowNull: false },

            sanctioned_amt: { type: DataTypes.FLOAT, allowNull: true },

            description: { type: DataTypes.FLOAT, allowNull: true },

            date_time: { type: DataTypes.FLOAT, allowNull: true },

            status: {
                type: DataTypes.STRING,
                defaultValue: "pending",
                validate: {
                    isIn: [["pending", "review", "accept", "reject"]]
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
            tableName: 'request',
            underscored: true // Use snake_case for column names if you prefer
        }

    );
    return requestModel;

}

