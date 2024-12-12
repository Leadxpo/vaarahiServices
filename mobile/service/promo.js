const promo_controller = require("../controller/promo");
const shortUUID = require('short-uuid');

const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")
const { verifyUser } = require("./userVerfication")

// UPDATE BANNER

const updatePromo = async (promoData) => {
    try {
        const userVerifyStatus = await verifyUser(promoData.body.userID)
        if (userVerifyStatus) {
            if (promoData.file) {
                const getUserDate = await promo_controller.getPromoById(promoData.body.id)

                if (getUserDate.promoPic !== null) {
                    await deleteImage(getUserDate.promoPic)
                    promoData.body.promoPic = promoData.file.filename
                }
                else {
                    promoData.body.promoPic = promoData.file.filename
                }
            }
            const updatedData = await promo_controller.updatePromo(promoData.body.id, promoData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update Promo in servicess.....!", error)
        return errorResponse("Error in update Promo in servicess")
    }
};

// GET BANNER BY ID

const getPromoById = async (promoData) => {
    try {
        // const userVerifyStatus = await verifyUser(promoData.body.userID)
        // if (userVerifyStatus) {
            const response = await promo_controller.getPromoById(promoData.body.id)
            return successResponse(response)
    } catch (error) {
        console.log("Error in get by id Promo in  servicess.....!", error)
        return errorResponse("Error in get by id Promo in servicess")
    }
};

// GET ALL BANNERS
const getAllPromos = async (promoData) => {
    try {
                const response = await promo_controller.getAllPromos()
                return successResponse(response)
        } catch (error) {
            console.log("Error in get by id Promo in  servicess.....!", error)
            return errorResponse("Error in get by id Promo in servicess")
        }
    };

    module.exports = {
        updatePromo,
        getPromoById,
        getAllPromos
    }