const { sequelize } = require('../../db');
const wishlistModel = require('../../model/wishlist')(sequelize);
const userModel = require('../../model/users')(sequelize);
const { Op, where } = require("sequelize");
const { errorResponse } = require('../service/response');

const createWishlist = async (userID,wishlistData) => {
    try {
        const response = await userModel.update(wishlistData, { where: { id: userID } });
        return response;
    } catch (error) {
        console.log("Error in creating wishlist in controller.....", error);
        throw error;
    }
};


const updateWishlist = async (Id, wishlistData) => {
    try {
        const response = await wishlistModel.update(wishlistData, { where: { id: Id } });
        return response;
    } catch (error) {
        console.log("Error in updating wishlist in controller.....", error);
        throw error;
    }
};


const getWishlistById = async (Id) => {
    try {
        const response = await wishlistModel.findOne({ where: { id: Id } });
        return response;
    } catch (error) {
        console.log("Error in getting wishlist by id in controller.....", error);
        throw error;
    }
};

const getWishlistByName = async (wishlistName) => {
    try {
        const response = await wishlistModel.findOne({ where: { name: wishlistName } });
        return response;
    } catch (error) {
        console.log("Error in getting wishlist by id in controller.....", error);
        throw error;
    }
};

const getWishlistByUserID = async (userID) => {
    try {
        const response = await wishlistModel.findAll({
            where:{user_id:userID}
        });
        return response;
    } catch (error) {
        console.log("Error in getting all wishlists in controller.....", error);
        throw error;
    }
};

const searchWishlistDetails = async (searchData) => {
    try {
        const response = await wishlistModel.findAll({
            where: {
                [Op.or]: [
                    { Name: { [Op.like]: `%${searchData.query}%` } },
                    { Description: { [Op.like]: `%${searchData.query}%` } },
                ]
            }
        });
        return response;
    } catch (error) {
        console.log("Error in searching wishlist details in controller.....", error);
        throw error;
    }
};

const deleteWishlist = async (Id) => {
    try {
        const response = await  wishlistModel.delete({ where: { id: Id } });
        return response;
    } catch (error) {
        console.log("Error in deleting wishlist in controller.....", error);
        throw error;
    }
};

module.exports = {
    createWishlist,
    updateWishlist,
    getWishlistById,
    getWishlistByName,
    getWishlistByUserID,
    searchWishlistDetails,
    deleteWishlist
};
