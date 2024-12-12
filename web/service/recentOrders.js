const recentOrders_controller = require("../controller/recentOrders");
const categories_controller = require("../controller/categories");
const {  verifyToken } = require("./jwttoken")
const { successResponse, errorResponse } = require("./response");
// const csv = require('csv-parser');
// const fs = require('file-system');

// CREATE PRODUCT
const createRecentOrders = async (recentOrdersData) => {
    try {
        const token = recentOrdersData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token");
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData);
        }
        if (decodedData.role == "admin") {
            const response = await recentOrders_controller.createRecentOrders(recentOrdersData.body);
            return successResponse(response);
        }
    } catch (error) {
        console.log("Error in create  recentOrderss..", error);
        return errorResponse("Error in create recentOrders..");
    }
};

// UPDATE PRODUCT
const updateRecentOrders = async (recentOrdersData) => {
    try {
        const token = recentOrdersData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token");
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData);
        }
        if (decodedData.role == "admin") {
            const updatedData = await recentOrders_controller.updateRecentOrders(recentOrdersData.body.id, recentOrdersData.body);
            return successResponse(updatedData);
        }
        return errorResponse("access denied....!");
    } catch (error) {
        console.log("Error in update RecentOrders in services.....!", error);
        return errorResponse("Error in update RecentOrders in services");
    }
};

// DELETE PRODUCT
const deleteRecentOrders = async (recentOrdersData) => {
    try {
        const token = recentOrdersData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token");
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData);
        }
        if (decodedData.role == "admin") {
            const deleteData = { status: 'inactive' }
            const deletedData = await recentOrders_controller.deleteRecentOrders(recentOrdersData.body.id, deleteData);
            return successResponse(deletedData);
        }
        return errorResponse("access denied...!");
    } catch (error) {
        console.log("Error in delete RecentOrders in services.....!", error);
        return errorResponse("Error in delete RecentOrders in services");
    }
};

// GET PRODUCT BY ID

const getRecentOrdersById = async (recentOrdersData) => {
    try {
        const token = recentOrdersData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token");
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData);
        }

        if (decodedData.role === "admin" || decodedData.role === "user" || decodedData.role === "deliveryPartner") {
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
        const token = recentOrdersData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token");
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData);
        }
        if (decodedData.role === "admin" || decodedData.role === "user" || decodedData.role === "deliveryPartner") {
            const response = await recentOrders_controller.getAllRecentOrders(recentOrdersData.body);
            return successResponse(response);
        }
    } catch (error) {
        console.log("Error in get all RecentOrders in services.....!", error);
        return errorResponse("Error in get all RecentOrders in services");
    }
};

// SEARCH PRODUCT DETAILS

const searchRecentOrdersDetails = async (recentOrdersData) => {
    try {
        const token = recentOrdersData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token");
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData);
        }
        if (decodedData.role === "admin" || decodedData.role === "user" || decodedData.role === "deliveryPartner") {
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
    createRecentOrders,
    updateRecentOrders,
    deleteRecentOrders,
    getRecentOrdersById,
    getAllRecentOrders,
    searchRecentOrdersDetails,
}
