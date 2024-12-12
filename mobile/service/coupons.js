const coupon_controller = require("../controller/coupons");
const shortUUID = require('short-uuid');

const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")
const { verifyUser } = require("./userVerfication")

// UPDATE PRODUCT

const updateCoupon = async (couponData) => {
    try {
        const userVerifyStatus = await verifyUser(couponData.body.userID)
        if (userVerifyStatus) {
            if (couponData.file) {
                const getCouponDate = await coupon_controller.getCouponById(couponData.body.id)

                if (getCouponDate.CouponPic !== null) {
                    await deleteImage(getCouponDate.CouponPic)
                    couponData.body.CouponPic = couponData.file.filename
                }
                else {
                    couponData.body.CouponPic = couponData.file.filename
                }
            }
            const updatedData = await coupon_controller.updateCoupon(couponData.body.id, couponData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update coupon in servicess.....!", error)
        return errorResponse("Error in update coupon in servicess")
    }
};

// GET PRODUCT BY ID

const getCouponById = async (couponData) => {
    try {
        const userVerifyStatus = await verifyUser(couponData.body.userID)
        if (userVerifyStatus) {
            const response = await coupon_controller.getCouponById(couponData.body.id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id coupon in  servicess.....!", error)
        return errorResponse("Error in get by id coupon in servicess")
    }
};

// GET ALL PRODUCT

const getAllCoupon = async (couponData) => {
    try {
        // const userVerifyStatus = await verifyUser(couponData.body.userID)
        // if (userVerifyStatus) {
            const response = await coupon_controller.getAllCoupon(couponData.body)
            return successResponse(response)
        // }

    } catch (error) {
        console.log("Error in get all coupon in servicess.....!", error)
        return errorResponse("Error in get all coupon in servicess")
    }
};

// SEARCH PRODUCT DETAILS

const searchCouponDetails = async (couponData) => {
    try {
        const userVerifyStatus = await verifyUser(couponData.body.userID)
        if (userVerifyStatus) {
            const Response = await coupon_controller.searchCouponDetails(couponData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search coupon in  servicess.....!", error)
        return errorResponse("Error in search coupon in  servicess")
    }
};


module.exports = {
    updateCoupon,
    getCouponById,
    getAllCoupon,
    searchCouponDetails


}