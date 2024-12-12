const { sequelize } = require('../../db')
const notificationModel = require('../../model/notification')(sequelize)
const { Op, where } = require("sequelize");
const { errorResponse } = require('../service/response');


// CREATE notification

const createNotification = async  (notificationData) => {
    try {
        const newNotification = await notificationModel.create (notificationData);
        return newNotification;
    }
    catch (error) {
        console.error("Error in createNotification details in controller", error);
        throw new Error("Error in createNotification in controller");
    }
};


// UPDATE notificationS

const updateNotification = async  (notification_id, notificationData) => {
    try {
        const newNotification = await notificationModel.update (notificationData, {
            where: {
                id: notification_id
            }
        });
        return newNotification;
    }
    catch (error) {
        console.error("Error in update notification in controller", error);
        throw new Error("Error update notification");
    }
};

// GET notification

const getNotificationById = async  (notification_id) => {
    try {
        const notification = await notificationModel.findOne({
            where: {
                id: notification_id
            }
        })
        return notification
    }
    catch (error) {
        console.log("error in get notification in controller..!", error);
        throw new Error('enable to create notification error')
    }
};



// GET ALL notification

const getAllNotification = async () => {
    try {

        const notification = await notificationModel.findAll();
        return notification
    }
    catch (error) {
        console.log("error in get notification in controller..!", error);
        throw new Error('enable to create notification error')
    }
}

const searchNotificationDetails = async  (notificationData) => {
    try {

        const data = {};
        if  (notificationData.name) {
            data.name = notificationData.name
        }

        if  (notificationData.id) {
            data.id = notificationData.id
        }

        if  (notificationData.phone_no) {
            data.phone_no = notificationData.phone_no
        }

        const notification = await notificationModel.findAll({

            where: data

        });
        return notification


    } catch (error) {
        console.log("erorr in surch notification in controller", error)
        errorResponse("error in surch notification in controller")
    }
};

//  COUNT

const countNotificationDetails = async () => {

    try {
        const totalNotification = await notificationModel.count();
        const totalMembership = await notificationModel.count({
            where: {
                isMembership: true
            }
        });
        var counts={Notifications:totalNotification,membership:totalMembership}
        return counts;
    }
    catch (error) {
        console.error("Error in count notification in controller", error);
        throw new Error("Error count notification Details");
    }
}


module.exports = {
    createNotification,
    updateNotification,
    getNotificationById,
    getAllNotification,
    searchNotificationDetails,
    countNotificationDetails,
}