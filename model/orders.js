const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const ordersModel = Sequelize.define('orders',
        {
            id: {
                type: DataTypes.INTEGER, autoIncrement: true,
                primaryKey: true,
            },
            
            user_id: {
                type: DataTypes.STRING,
                allowNull: false
            },

            name: {
                type: DataTypes.STRING,
                allowNull: true 
            },

            phone_no: {
                type: DataTypes.STRING,
                allowNull: false
            },
            otp: {
                type: DataTypes.STRING,
                allowNull: true
            },
            billing_address: {
                type: DataTypes.JSON,
                allowNull: false, // Allow null in case no orders information is present
            },
            shipping_address: {
                type: DataTypes.JSON,
                allowNull: false, // Allow null in case no orders information is present
            },
            date_time_slot: {
                type: DataTypes.STRING,
                allowNull: false 
            },
            coupon_applied: { 
                type: DataTypes.STRING,
                allowNull: true
            },
           
            Transaction_id: {
                type: DataTypes.STRING,
                allowNull: false
            },

            payment_mode: {
                type: DataTypes.STRING,
                allowNull: false
            },

            discount: {
                type: DataTypes.FLOAT,
                defaultValue: 0,
                allowNull: true
            },
            total_amt: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            paid_amt: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            order_items: {
                type: DataTypes.JSON,
                allowNull: false, // Allow null in case no orders information is present
                defaultValue: []
            },
            staff_id: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Delivery_person: { 
                type: DataTypes.STRING,
                allowNull: true
            },
            Delivery_assign_date: { 
                type: DataTypes.STRING,
                allowNull: true
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: "pending", 
                allowNull: false
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
            tableName: 'orders',
            underscored: true // Use snake_case for column names if you prefer
        }

    );
    return ordersModel;

}

