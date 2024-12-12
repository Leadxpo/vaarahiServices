const { sequelize } = require('../../db')
const userModel = require('../../model/users')(sequelize)
const productModel = require('../../model/product')(sequelize);
const orderModel = require('../../model/orders')(sequelize);
const staffModel = require('../../model/deliveryStaff')(sequelize)
const notificationModel = require('../../model/notification')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../service/response');


//  COUNT

const countDetails = async () => {

    try {
        const totalUser = await userModel.count();
        const totalUsersRevenue = await userModel.sum('revenu_generated');
        const totalStaff = await staffModel.count();
        const totalProduct = await productModel.count();
        const notificationsViewCount = await notificationModel.count({
            where: {
                isView: true
            }
        });

        const totalOrders = await orderModel.count();

        var counts = {
            totalUsers: totalUser,
            totalUsersRevenue: totalUsersRevenue || 0,
            totalStaff: totalStaff,
            totalProduct: totalProduct,
            totalOrders: totalOrders,
            notificationViewCount: notificationsViewCount,
        }
        return counts;
    }
    catch (error) {
        console.error("Error in count user in controller", error);
        throw new Error("Error count user Details");
    }
}


module.exports = {
    countDetails,
}