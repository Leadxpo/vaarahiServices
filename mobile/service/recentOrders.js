const recentOrders_controller = require("../controller/recentOrders");
const categories_controller = require("../controller/categories");
;
const { verifyUser } = require("./userVerfication")
const { successResponse, errorResponse } = require("./response");
// const csv = require('csv-parser');
// const fs = require('file-system');

const  createRecentOrder = async (recentOrdersData) => {
    try {
        const userVerifyStatus = await verifyUser(recentOrdersData.body.userID)
        if (userVerifyStatus) {
            const response = await recentOrders_controller.createRecentOrder(recentOrdersData.body);
            return successResponse(response);
        }
    } catch (error) {
        console.log("Error in create  products..", error);
        return errorResponse("Error in create products..");
    }
};

// UPDATE PRODUCT
const updateRecentOrders = async (recentOrdersData) => {
    try {
        const userVerifyStatus = await verifyUser(recentOrdersData.body.userID)
        if (userVerifyStatus) {
            const updatedData = await recentOrders_controller.updateRecentOrders(recentOrdersData.body.id, recentOrdersData.body);
            return successResponse(updatedData);
        }
        return errorResponse("access denied....!");
    } catch (error) {
        console.log("Error in update RecentOrders in services.....!", error);
        return errorResponse("Error in update RecentOrders in services");
    }
};

// GET PRODUCT BY ID

const getAllRecentOrdersByUserID = async (recentOrdersData) => {
    console.log("recentOrdersData :",recentOrdersData.body)
    try {
        const userVerifyStatus = await verifyUser(recentOrdersData.body.userID)
        if (userVerifyStatus) {
            const response = await recentOrders_controller.getAllRecentOrdersByUserID(recentOrdersData.body.userID);
            return successResponse(response);
        }

    } catch (error) {
        console.log("Error in get by id RecentOrders in services.....!", error);
        return errorResponse("Error in get by id RecentOrders in services");
    }
};

const getRecentOrdersById = async (recentOrdersData) => {
    try {
        const userVerifyStatus = await verifyUser(recentOrdersData.body.userID)
        if (userVerifyStatus) {
            const response = await recentOrders_controller.getRecentOrdersById(recentOrdersData.body.id);
            return successResponse(response);
        }

    } catch (error) {
        console.log("Error in get by id RecentOrders in services.....!", error);
        return errorResponse("Error in get by id RecentOrders in services");
    }
};

// GET ALL PRODUCTS 

const getAllRecentOrders = async (recentOrdersData) => {
    try {
        // const userVerifyStatus = await verifyUser(recentOrdersData.body.userID)
        // if (userVerifyStatus) {
            const response = await recentOrders_controller.getAllRecentOrders();
            return successResponse(response);
        // }
    } catch (error) {
        console.log("Error in get all RecentOrders in services.....!", error);
        return errorResponse("Error in get all RecentOrders in services");
    }
};

// SEARCH PRODUCT DETAILS

const searchRecentOrdersDetails = async (recentOrdersData) => {
    try {
        const userVerifyStatus = await verifyUser(recentOrdersData.body.userID)
        if (userVerifyStatus) {
            const Response = await recentOrders_controller.searchRecentOrdersDetails(recentOrdersData.body);
            return successResponse(Response);
        }
        return errorResponse("access denied...!");
    } catch (error) {
        console.log("Error in search RecentOrders in services.....!", error);
        return errorResponse("Error in search RecentOrders in services");
    }
};

module.exports = {
    createRecentOrder,
    updateRecentOrders,
    getRecentOrdersById,
    getAllRecentOrders,
    searchRecentOrdersDetails,
    getAllRecentOrdersByUserID
}
