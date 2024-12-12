const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const addressModel = Sequelize.define('address',
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
            
           name: { type: DataTypes.STRING,allowNull: false },

           phone_no: { type: DataTypes.STRING,allowNull: true },

            user_id: { type: DataTypes.STRING,allowNull: false }, 

            user_name: { type: DataTypes.STRING,allowNull: true },

            address_line_one: { type: DataTypes.STRING,allowNull: true },

            address_line_two: { type: DataTypes.STRING,allowNull: true },

            city: { type: DataTypes.STRING,allowNull: true },

            state: { type: DataTypes.STRING,allowNull: true, defaultValue: "AndhraPradesh",},

            pincode: { type: DataTypes.STRING,allowNull: true }, 

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
            tableName: 'address',
            underscored: true // Use snake_case for column names if you prefer
        }

    );
    return addressModel;

}

