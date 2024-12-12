const { sequelize } = require('../../db');
const recentOrdersModel = require('../../model/recentOrders')(sequelize);
const { Op } = require("sequelize");
const { errorResponse } = require('../service/response');

const createRecentOrder = async (recentOrdersData) => {
    try {
        const response = await recentOrdersModel.create(recentOrdersData);
        return response;
    } catch (error) {
        console.log("Error in creating recent ordered product in controller.....", error);
        throw error;
    }
};

const updateRecentOrders = async (Id, recentOrdersData) => {
    try {
        const response = await recentOrdersModel.update(recentOrdersData, { where: { id: Id } });
        return response;
    } catch (error) {
        console.log("Error in updating recentOrders in controller.....", error);
        throw error;
    }
};

const getAllRecentOrdersByUserID = async (userID) => {
    console.log("userid ------> ",userID);
    try {
        const response = await recentOrdersModel.findAll({ where: { user_id: userID } });
        return response;
    } catch (error) {
        console.log("Error in getting recentOrders by id in controller.....", error);
        throw error;
    }
};

const getRecentOrdersById = async (Id) => {
    try {
        const response = await recentOrdersModel.findOne({ where: { id: Id } });
        return response;
    } catch (error) {
        console.log("Error in getting recentOrders by id in controller.....", error);
        throw error;
    }
};

const getRecentOrdersByName = async (recentOrdersName) => {
    try {
        const response = await recentOrdersModel.findOne({ where: { name: recentOrdersName } });
        return response;
    } catch (error) {
        console.log("Error in getting recentOrders by id in controller.....", error);
        throw error;
    }
};

const getAllRecentOrders = async () => {
    try {
        const response = await recentOrdersModel.findAll();
        return response;
    } catch (error) {
        console.log("Error in getting all recentOrderss in controller.....", error);
        throw error;
    }
};

const searchRecentOrdersDetails = async (searchData) => {
    try {
        const response = await recentOrdersModel.findAll({
            where: {
                [Op.or]: [
                    { Name: { [Op.like]: `%${searchData.query}%` } },
                    { Description: { [Op.like]: `%${searchData.query}%` } },
                ]
            }
        });
        return response;
    } catch (error) {
        console.log("Error in searching recentOrders details in controller.....", error);
        throw error;
    }
};

module.exports = {
    createRecentOrder,
    updateRecentOrders,
    getRecentOrdersById,
    getAllRecentOrdersByUserID,
    getRecentOrdersByName,
    getAllRecentOrders,
    searchRecentOrdersDetails,
};
