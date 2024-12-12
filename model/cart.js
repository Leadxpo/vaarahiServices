const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const cartModel = Sequelize.define('cart',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true // Auto-increment if you want it to be auto-incremented; otherwise, set to false
            },
            user_id: {
                type: DataTypes.STRING,
                allowNull: false
            }, 
            product_id: {
                type: DataTypes.STRING,
                allowNull: false
            }, 
            variant_id: {
                type: DataTypes.STRING,
                allowNull: true
            },
            product_name: {
                type: DataTypes.STRING, 
                allowNull: false
            }, 
            image: {
                type: DataTypes.STRING,
                allowNull: true
            },

            category_id: { type: DataTypes.STRING, allowNull: false },

            category: { type: DataTypes.STRING, allowNull: false },

            brand_id: { type: DataTypes.STRING, allowNull: true },

            brand: { type: DataTypes.STRING, allowNull: true },

            price: {
                type: DataTypes.FLOAT,
                allowNull: false
            },

            units: {
                type: DataTypes.STRING,
                allowNull: false
            },

            weight: { 
                type: DataTypes.STRING,
                allowNull: false
            },
            qty: { 
                type: DataTypes.INTEGER,
                allowNull: false
            },

            product_discount: {
                type: DataTypes.STRING,
                allowNull: true
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
            tableName: 'cart',
            underscored: true // Use snake_case for column names if you prefer
        });

    return cartModel;

}

