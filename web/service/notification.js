const notificationController = require("../controller/notification");
const shortUUID = require('short-uuid');
const { successResponse, errorResponse } = require("./response")
const {  verifyToken } = require("../service/jwttoken")

const NotificationService = require("../../storage/others/firebaseMessageing/notificationService")
// CREATE notification

const sendNotificationService = async (notificationData) => {
    try {

        const token = notificationData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
                const { deviceToken, title, body } = notificationData.body
                const response = await NotificationService.sendNotification(deviceToken, title, body);
                return successResponse(response);
            }
            return errorResponse("access denaine....!")
        }
    catch (error) {
            console.log("Error in create notification in services..", error)
            return errorResponse("Error in create notification in services..")
        }
    }
const createNotification = async (notificationData) => {
        try {

            const token = notificationData.headers.authorization;
            if (!token) {
                return errorResponse("Missing Token")
            }
            const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
            if (decodedData == "invalidtoken") {
                return errorResponse(decodedData)
            }
            if (decodedData.role === "admin") {
                const translator = shortUUID();
                const notificationId = translator.new();
                notificationData.body.id = notificationId;

                const response = await notificationController.createNotification(notificationData.body);
                return successResponse(response);
            }
            return errorResponse("access denaine....!")
        }
        catch (error) {
            console.log("Error in create notification in services..", error)
            return errorResponse("Error in create notification in services..")
        }
    }
    // UPDATE notification

    const updateNotification = async (notificationData) => {
        try {
            const token = notificationData.headers.authorization;
            if (!token) {
                return errorResponse("Missing Token")
            }
            const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
            if (decodedData == "invalidtoken") {
                return errorResponse(decodedData)
            }
            if (decodedData.role === "admin") {
                const updatedData = await notificationController.updateNotification(notificationData.body.id, notificationData.body)
                return successResponse(updatedData)
            }
            return errorResponse("access denaine....!")

        } catch (error) {
            console.log("Error in update notification .....!", error)
            return errorResponse("Error in update notification")
        }
    };

    // DELETE notification

    const deleteNotification = async (notificationData) => {
        try {
            const token = notificationData.headers.authorization;
            if (!token) {
                return errorResponse("Missing Token")
            }
            const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
            if (decodedData == "invalidtoken") {
                return errorResponse(decodedData)
            }
            if (decodedData.role === "admin") {
                const deletedData = await notificationController.deleteNotification(notificationData.body.id, notificationData.body)
                return successResponse(deletedData)
            }
        } catch (error) {
            console.log("Error in delete notification in  servicess.....!", error)
            return errorResponse("Error in delete notification in  servicess")
        }
    };

    // GET notification BY ID

    const getNotificationById = async (notificationData) => {
        try {
            const token = notificationData.headers.authorization;
            if (!token) {
                return errorResponse("Missing Token")
            }
            const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
            if (decodedData == "invalidtoken") {
                return errorResponse(decodedData)
            }
            if (decodedData.role === "admin") {
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
            const token = notificationData.headers.authorization;
            if (!token) {
                return errorResponse("Missing Token")
            }
            const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
            if (decodedData == "invalidtoken") {
                return errorResponse(decodedData)
            }
            if (decodedData.role == "admin") {
                const response = await notificationController.getAllNotification(notificationData.body)
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
            const token = notificationData.headers.authorization;
            if (!token) {
                return errorResponse("Missing Token")
            }
            const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
            if (decodedData == "invalidtoken") {
                return errorResponse(decodedData)
            }
            if (decodedData.role === "admin") {
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
            const token = notificationData.headers.authorization;
            if (!token) {
                return errorResponse("Missing Token")
            }
            const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
            if (decodedData == "invalidtoken") {
                return errorResponse(decodedData)
            }
            if (decodedData.role === "admin") {
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
        createNotification,
        updateNotification,
        searchNotificationDetails,
        deleteNotification,
        countNotificationDetails,
        getAllNotification,
        getNotificationById,
        sendNotificationService
    }