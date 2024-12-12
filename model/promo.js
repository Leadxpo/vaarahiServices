const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const promoModel = Sequelize.define('promo',
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

            name: { type: DataTypes.STRING, allowNull: false },

            image: { type: DataTypes.STRING, allowNull: true },

            dimensions: { type: DataTypes.STRING, allowNull: true },

            description: { type: DataTypes.STRING, allowNull: true },

            status: {
                type: DataTypes.STRING,
                defaultValue: "active",
                validate: {
                    isIn: [["active", "inactive"]]
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
            tableName: 'promo',
            underscored: true // Use snake_case for column names if you prefer
        }

    );
    return promoModel;

}

