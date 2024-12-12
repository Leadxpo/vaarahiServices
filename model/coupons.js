const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const couponsModel = Sequelize.define('coupons',
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

            name: { type: DataTypes.STRING, allowNull: false },

            coupon_code: { type: DataTypes.STRING, allowNull: false },

            image: { type: DataTypes.STRING, allowNull: true },

            type: { type: DataTypes.STRING,defaultValue: "all", validate: {
                isIn: [["all", "user"]] 
            }, allowNull: true },

            coupon_users: { type: DataTypes.JSON, defaultValue: [], allowNull: true },

            discount_type: { type: DataTypes.STRING, defaultValue: 'percentage', validate: {
                isIn: [["percentage", "money"]] 
            }, allowNull: true },

            coupon_discount: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },

            min_order_amt: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: true },

            max_discount_amt: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: true },

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
            tableName: 'coupons',
            underscored: true // Use snake_case for column names if you prefer
        }

    );
    return couponsModel;

}

