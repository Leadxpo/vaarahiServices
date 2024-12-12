const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const productModel = Sequelize.define('product',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true // Auto-increment if you want it to be auto-incremented; otherwise, set to false
            },
            product_id: {
                type: DataTypes.STRING,
                allowNull: false
            },
            name: {
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

            purchase: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },

            price: {
                type: DataTypes.FLOAT,
                allowNull: false
            },

            description: {
                type: DataTypes.TEXT,
                allowNull: true
            },

            stock: {
                type: DataTypes.INTEGER,
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

            tax: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: true
            },

            tax_value: {
                type: DataTypes.FLOAT,
                allowNull: true
            },

            totalsales: {
                type: DataTypes.INTEGER,
                defaultValue: 0, // Tracks total number of units sold
                allowNull: true
            },

            total_revenue: {
                type: DataTypes.FLOAT,
                defaultValue: 0.0, // Tracks total revenue generated
                allowNull: true

            },

            views: {
                type: DataTypes.INTEGER,
                defaultValue: 0, // Tracks the number of times the product has been viewed
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
            tableName: 'product',
            underscored: true // Use snake_case for column names if you prefer
        });

    return productModel;

}

