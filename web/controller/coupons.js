const { sequelize } = require('../../db')
const couponModel = require('../../model/coupons')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../service/response');


// CREATE PRODUCT

const createCoupon = async (offerData) => {
    try {
        const newOffer = await couponModel.create(offerData);
        return newOffer;
    }
    catch (error) {
        console.error("Error in create coupon details in controller", error);
        throw new Error("Error in create coupon in controller");
    }
};

// UPDATE PRODUCT

const updateCoupon = async (Id, offerData) => {
    try {
        const updateOffer = await couponModel.update(offerData, {
            where: {
                id: Id
            }
        });
        return updateOffer;
    }
    catch (error) {
        console.error("Error in update coupon in controller", error);
        throw new Error("Error update coupon in controller");
    }
};

// DELETE PRODUCT

const deleteCoupon = async (Id) => {
    try {
        const Offer = await couponModel.destroy({
            where: {
                id: Id
            }
        });
        return Offer;
    }
    catch (error) {
        console.error("Error in delete coupon in controller", error);
        throw new Error("Error delete coupon in controller");
    }
};

// GET PRODUCT

const getCouponById = async (Id) => {
    try {
        const Offer = await couponModel.findOne({
            where: {
                id: Id
            }
        })
        return Offer
    }
    catch (error) {
        console.log("error in get coupon in controller..!", error);
        throw new Error('enable to create coupon error')
    }
};

// GET ALL PRODUCT

const getAllCoupon = async (offerData) => {
    try {

        const Offer = await couponModel.findAll(offerData);
        return Offer
    }
    catch (error) {
        console.log("error in get coupon in controller..!", error);
        throw new Error('enable to get coupon error')
    }
}

// SEARCH PRODUCT

const searchCouponDetails = async (offerData) => {
    try {

        const data = {};
        if (offerData.name) {
            data.name = offerData.name
        }

        if (offerData.id) {
            data.id = offerData.id
        }
        const Offer = await couponModel.findAll({
            where: data
        });
        return Offer


    } catch (error) {
        console.log("erorr in search coupon in controller", error)
        errorResponse("error in search coupon in controller")
    }
};

module.exports = {
    createCoupon,
    updateCoupon,
    deleteCoupon,
    getCouponById,
    getAllCoupon,
    searchCouponDetails
 
 
}