const notificationController = require("../controller/notification");
const { successResponse, errorResponse } = require("./response")
const { verifyUser, verifyDeliveryStaff } = require("./userVerfication")

// UPDATE notification

const updateNotification = async (notificationData) => {
    try {
        const userVerifyStatus = await verifyUser(notificationData.body.userID)
        if (userVerifyStatus) {
            const updatedData = await notificationController.updateNotification(notificationData.body.id, notificationData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update notification .....!", error)
        return errorResponse("Error in update notification")
    }
};

const updateNotificationIsview = async (notificationData) => {
    try {
        const userVerifyStatus = await verifyUser(notificationData.body.userID)
        if (userVerifyStatus) {
            const rrr = await notificationController.getNotificationById(notificationData.body.id);
            if (rrr.subtype == "all") {
                const viewer = notificationData.body.Viewer
                if (viewer) {
                    viewer.push(notificationData.body.userID)
                    console.log("viewers : ", viewer)
                    notificationData.body.Viewer = viewer
                }
            } else {
                if (notificationData.body.userID == rrr.user_id) {
                    notificationData.body.isview = true
                }
            }
            const updatedData = await notificationController.updateNotification(notificationData.body.id, notificationData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update notification .....!", error)
        return errorResponse("Error in update notification")
    }
};

// GET notification BY ID

const getNotificationById = async (notificationData) => {
    try {
        const userVerifyStatus = await verifyUser(notificationData.body.userID)
        if (userVerifyStatus) {
            const response = await notificationController.getNotificationById(notificationData.body.id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id notification in  servicess.....!", error)
        return errorResponse("Error in get by id notification in servicess")
    }
};

// GET ALL notification

const getAllNotification = async (notificationData) => {
    try {
        const userVerifyStatus = await verifyUser(notificationData.body.userID)
        if (userVerifyStatus) {
            const response = await notificationController.getAllNotification()
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all notification in  servicess.....!", error)
        return errorResponse("Error in get all notification in servicess")
    }
};

const getNotificationsByUserID = async (notificationData) => {
    try {
        const userVerifyStatus = await verifyUser(notificationData.body.userID)
        if (userVerifyStatus) {
            const response = await notificationController.getAllNotification()
            const rrr = response.filter((item) => {
                if (item.type === "all" || item.type === "user") {
                    if (item.subtype === "user") {
                        return item.user_id === notificationData.body.userID;
                    } else {
                        return item.subtype === "all";
                    }
                }
                return false;
            });

            // const response = await notificationController.getNotificationsByUserID(notificationData.body.userID)
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all notification in  servicess.....!", error)
        return errorResponse("Error in get all notification in servicess")
    }
};

const getNotificationsByStaffID = async (notificationData) => {
    try {
        const staffVerifyStatus = await verifyDeliveryStaff(notificationData.body.staff_id)
        if (staffVerifyStatus) {
            const response = await notificationController.getAllNotification()
            const rrr = response.filter((item) => {
                if (item.type === "all" || item.type === "deliveryStaff") {
                    if (item.subtype === "deliveryStaff") {
                        return item.staff_id === notificationData.body.staff_id;
                    } else {
                        return item.subtype === "all";
                    }
                }
                return false;
            });

            // const response = await notificationController.getNotificationsByUserID(notificationData.body.userID)
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all notification in  servicess.....!", error)
        return errorResponse("Error in get all notification in servicess")
    }
};

// SEARCH EMPLOYE DETAILS

const searchNotificationDetails = async (notificationData) => {
    try {
        const userVerifyStatus = await verifyUser(notificationData.body.userID)
        if (userVerifyStatus) {
            const employeeResponse = await notificationController.searchNotificationDetails(notificationData.body)
            return successResponse(employeeResponse)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in surch notification in servicess.....!", error)
        return errorResponse("Error in surch notification in servicess")
    }
};

// COUNT

const countNotificationDetails = async (notificationData) => {
    try {
        const userVerifyStatus = await verifyUser(notificationData.body.userID)
        if (userVerifyStatus) {
            const Response = await notificationController.countNotificationDetails()
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in count in notifications.....!", error)
        return errorResponse("Error in count in notifications")
    }
};

module.exports = {
    updateNotification,
    updateNotificationIsview,
    getAllNotification,
    searchNotificationDetails,
    countNotificationDetails,
    getNotificationsByUserID,
    getNotificationsByStaffID,
    getNotificationById,
}