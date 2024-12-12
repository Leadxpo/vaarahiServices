const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const deliveryStaffModel = Sequelize.define('deliveryStaff',
        {
            id: { type: DataTypes.STRING, primaryKey: true },

            staff_id: { type: DataTypes.STRING, allowNull: false },
            
            password: { type: DataTypes.STRING, allowNull: false },
            
            name: { type: DataTypes.STRING, allowNull: false },

            image: { type: DataTypes.STRING, allowNull: true },

            phone_no: {
                type: DataTypes.STRING, unique: true, validate: {
                    is: /^[0-9]+$/i // Example regex to ensure only numeric values
                }, allowNull: false
            },
            
            address: { type: DataTypes.STRING, allowNull: true },

            emergency_contact: {
                type: DataTypes.STRING, unique: true, validate: {
                    is: /^[0-9]+$/i // Example regex to ensure only numeric values
                }, allowNull: true
            },

            adhar_proof: { type: DataTypes.STRING, allowNull: true },

            Licence_proof: { type: DataTypes.STRING, allowNull: true },

            rc_book: { type: DataTypes.STRING, allowNull: true },

            islogin: { type: DataTypes.BOOLEAN, defaultValue: false},

            bank_name: { type: DataTypes.STRING,allowNull: true },

            bank_account_holder_name: { type: DataTypes.STRING,allowNull: true },

            bank_account_no: { type: DataTypes.STRING,allowNull: true },

            bank_ifsc: { type: DataTypes.STRING,allowNull: true },
            
            bank_branch: { type: DataTypes.STRING,allowNull: true },

            earnedAmount: { type: DataTypes.FLOAT, defaultValue:0,allowNull: true },

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
            tableName: 'deliveryStaff',
            underscored: true // Use snake_case for column names if you prefer
        }

    );
    return deliveryStaffModel;

}

