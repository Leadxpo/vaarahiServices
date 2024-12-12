const banner_controller = require("../controller/banners");
const shortUUID = require('short-uuid');
const { verifyToken } = require("../service/jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")
const { verifyUser } = require("./userVerfication")

// UPDATE BANNER

const updateBanner = async (bannerData) => {
    try {
        const userVerifyStatus = await verifyUser(bannerData.body.userID)
        if (userVerifyStatus) {
            if (bannerData.file) {
                const getUserDate = await banner_controller.getBannerById(bannerData.body.id)

                if (getUserDate.bannerPic !== null) {
                    await deleteImage(getUserDate.bannerPic)
                    bannerData.body.bannerPic = bannerData.file.filename
                }
                else {
                    bannerData.body.bannerPic = bannerData.file.filename
                }
            }
            const updatedData = await banner_controller.updateBanner(bannerData.body.id, bannerData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update Banner in servicess.....!", error)
        return errorResponse("Error in update Banner in servicess")
    }
};

// GET BANNER BY ID

const getBannerById = async (bannerData) => {
    try {
        const userVerifyStatus = await verifyUser(bannerData.body.userID)
        if (userVerifyStatus) {
            const response = await banner_controller.getBannerById(bannerData.body.id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id Banner in  servicess.....!", error)
        return errorResponse("Error in get by id Banner in servicess")
    }
};

// GET ALL BANNERS
const getAllBanners = async (bannerData) => {
    try {
        // const userVerifyStatus = await verifyUser(bannerData.body.userID)
        // if (userVerifyStatus) {
                const response = await banner_controller.getAllBanners()
                return successResponse(response)
            // }
        } catch (error) {
            console.log("Error in get by id Banner in  servicess.....!", error)
            return errorResponse("Error in get by id Banner in servicess")
        }
    };

    module.exports = {
        updateBanner,
        getBannerById,
        getAllBanners
    }