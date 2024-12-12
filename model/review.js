const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const reviewModel = Sequelize.define('review',
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

            ReplyDateTime: { type: DataTypes.STRING, allowNull: true },

            user_id: { type: DataTypes.STRING, allowNull: true },

            reply: { type: DataTypes.STRING, allowNull: true },

            review: { type: DataTypes.STRING, allowNull: false },

            isView: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: true },

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
            tableName: 'review'
        }

    );
    return reviewModel;

}

