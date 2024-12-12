const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const userModel = Sequelize.define('user',
        {
            id: { type: DataTypes.STRING, primaryKey: true },

            name: { type: DataTypes.STRING, allowNull: true },

            image: { type: DataTypes.STRING, allowNull: true },
 
            phone_no: {
                type: DataTypes.STRING, unique: true, validate: {
                    is: /^[0-9]+$/i // Example regex to ensure only numeric values
                }, allowNull: false
            },

            gst: { type: DataTypes.STRING, allowNull: true },

            address: { type: DataTypes.STRING, allowNull: true },

            deviceToken: { type: DataTypes.JSON, allowNull: true, defaultValue: []},

            revenu_generated: { type: DataTypes.STRING, allowNull: true},

            billing_address: { type: DataTypes.STRING, allowNull: true},

            OTP: { type: DataTypes.STRING, allowNull: true},

            OTP_expiredate: { type: DataTypes.STRING, allowNull: true},

            shiping_address: { type: DataTypes.STRING, allowNull: true },

            islogin: { type: DataTypes.BOOLEAN, defaultValue: false},

            wishList: { type: DataTypes.JSON, allowNull: true, defaultValue: []},

            bank_name: { type: DataTypes.STRING,allowNull: true },

            bank_account_holder_name: { type: DataTypes.STRING,allowNull: true },

            bank_account_no: { type: DataTypes.STRING,allowNull: true },

            bank_ifsc: { type: DataTypes.STRING,allowNull: true },
            
            bank_branch: { type: DataTypes.STRING,allowNull: true },
            
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
            tableName: 'user'
        }

    );
    return userModel;

}

