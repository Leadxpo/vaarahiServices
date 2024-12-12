const { sequelize } = require('../../db')
const couponModel = require('../../model/coupons')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../service/response');



// UPDATE PRODUCT

const updateCoupon = async (Id, couponData) => {
    try {
        const updateCoupon = await couponModel.update(couponData, {
            where: {
                id: Id
            }
        });
        return updateCoupon;
    }
    catch (error) {
        console.error("Error in update coupon in controller", error);
        throw new Error("Error update coupon in controller");
    }
};

// GET PRODUCT

const getCouponById = async (Id) => {
    try {
        const coupon = await couponModel.findOne({
            where: {
                id: Id
            }
        })
        return coupon
    }
    catch (error) {
        console.log("error in get coupon in controller..!", error);
        throw new Error('enable to create coupon error')
    }
};

// GET ALL PRODUCT

const getAllCoupon = async (couponData) => {
    try {

        const coupon = await couponModel.findAll(couponData);
        return coupon
    }
    catch (error) {
        console.log("error in get coupon in controller..!", error);
        throw new Error('enable to get coupon error')
    }
}

// SEARCH PRODUCT

const searchCouponDetails = async (couponData) => {
    try {

        const data = {};
        if (couponData.name) {
            data.name = couponData.name
        }

        if (couponData.id) {
            data.id = couponData.id
        }
        const coupon = await couponModel.findAll({
            where: data
        });
        return coupon


    } catch (error) {
        console.log("erorr in search coupon in controller", error)
        errorResponse("error in search coupon in controller")
    }
};

module.exports = {
    updateCoupon,
    getCouponById,
    getAllCoupon,
    searchCouponDetails


}