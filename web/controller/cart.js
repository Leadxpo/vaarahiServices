const { sequelize } = require('../../db');
const cartModel = require('../../model/cart')(sequelize);
const { Op } = require("sequelize");
const { errorResponse } = require('../service/response');

const createCart = async (cartData) => {
    try {
        const response = await cartModel.create(cartData);
        return response;
    } catch (error) {
        console.log("Error in creating cart in controller.....", error);
        throw error;
    }
};

const updateCart = async (Id, cartData) => {
    try {
        const response = await cartModel.update(cartData, { where: { id: Id } });
        return response;
    } catch (error) {
        console.log("Error in updating cart in controller.....", error);
        throw error;
    }
};

const deleteCart = async (Id, cartData) => {
    try {
        const response = await  cartModel.update(cartData,{ where: { id: Id } });
        return response;
    } catch (error) {
        console.log("Error in deleting cart in controller.....", error);
        throw error;
    }
};

const getCartById = async (Id) => {
    try {
        const response = await cartModel.findOne({ where: { id: Id } });
        return response;
    } catch (error) {
        console.log("Error in getting cart by id in controller.....", error);
        throw error;
    }
};

const getCartByName = async (cartName) => {
    try {
        const response = await cartModel.findOne({ where: { name: cartName } });
        return response;
    } catch (error) {
        console.log("Error in getting cart by id in controller.....", error);
        throw error;
    }
};

const getAllCart = async () => {
    try {
        const response = await cartModel.findAll();
        return response;
    } catch (error) {
        console.log("Error in getting all carts in controller.....", error);
        throw error;
    }
};

const searchCartDetails = async (searchData) => {
    try {
        const response = await cartModel.findAll({
            where: {
                [Op.or]: [
                    { Name: { [Op.like]: `%${searchData.query}%` } },
                    { Description: { [Op.like]: `%${searchData.query}%` } },
                ]
            }
        });
        return response;
    } catch (error) {
        console.log("Error in searching cart details in controller.....", error);
        throw error;
    }
};

// const bulkCartUpload = async (cartData) => {
//     try {
//         const response = await cartModel.bulkCreate(cartData);
//         return response;
//     } catch (error) {
//         console.log("Error in bulk uploading carts in controller.....", error);
//         throw error;
//     }
// };

module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getCartById,
    getCartByName,
    getAllCart,
    searchCartDetails,
};
