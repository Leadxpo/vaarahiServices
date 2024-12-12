const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const brandModel = Sequelize.define('brand',
        {
            brand_id: { type: DataTypes.STRING, primaryKey: true },

            name: { type: DataTypes.STRING, allowNull: false },

            image: { type: DataTypes.STRING, allowNull: true },
 
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
            tableName: 'brand',
            underscored: true // Use snake_case for column names if you prefer
        });
   
    return brandModel;

}

