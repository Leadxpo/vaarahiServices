const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const wishlistModel = Sequelize.define('wishlist',
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

            product_discount: {
                type: DataTypes.STRING,
                allowNull: true
            },

            stockStatus: {
                type: DataTypes.STRING,
                defaultValue: "inStock",
                validate: {
                    isIn: [['inStock', 'outOfStock']] // Ensure status is either 'inStock' or 'outOfStock'
                },
            },

            status: {
                type: DataTypes.STRING,
                defaultValue: "active",
                validate: {
                    isIn: [['active', 'inactive']] // Ensure status is either 'inStock' or 'outOfStock'
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
            tableName: 'wishlist',
            underscored: true // Use snake_case for column names if you prefer
        });

    return wishlistModel;

}

