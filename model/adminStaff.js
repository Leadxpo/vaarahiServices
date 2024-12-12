const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const adminStaffModel = Sequelize.define('adminStaff',
        {
            id: { type: DataTypes.STRING, primaryKey: true },
            
            name: { type: DataTypes.STRING, allowNull: false },
            
            password: { type: DataTypes.STRING, allowNull: true },
            
            role: { type: DataTypes.STRING, allowNull: false },

            gender: {
                type: DataTypes.STRING, validate: {
                    isIn: [['male', 'female', 'Other']] // Example values for gender
                }, allowNull: true,
            },

            phone_no: {
                type: DataTypes.STRING, unique: true, validate: {
                    is: /^[0-9]+$/i // Example regex to ensure only numeric values
                }, allowNull: false
            },
            
            address: { type: DataTypes.STRING, allowNull: true },

            islogin: { type: DataTypes.BOOLEAN, defaultValue: false},

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
            tableName: 'adminStaff',
            underscored: true // Use snake_case for column names if you prefer
        }

    );
    return adminStaffModel;

}

