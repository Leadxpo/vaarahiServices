const brands_controller = require("../controller/brand");
const { successResponse, errorResponse } = require("./response")
const { verifyUser } = require("./userVerfication")

// GET  CATEGORIES BY ID

const getBrandsById = async (brandData) => {
    try {
        const userVerifyStatus = await verifyUser(brandData.body.userID)
        if (userVerifyStatus) {
            const response = await brands_controller.getBrandsById(brandData.body.brandID)
            return successResponse(response)
        }
        return errorResponse("access Denain........")

    } catch (error) {
        console.log("Error in get by id brands in  servicess.....!", error)
        return errorResponse("Error in get by id brands in servicess")
    }
};

const getBrandwithPagination = async (brandData) => {
    try {
        const { page, limit } = brandData.body;
        console.log("page :", page)
        console.log("limit :", limit)
        const pages = parseInt(page);
        const limits = parseInt(limit);
        const response = await brands_controller.getBrandwithPagination( pages, limits );

            return successResponse(response); // Return the success response
    } catch (error) {
        console.log("Error in service layer while fetching brands: ", error);
        return errorResponse("Error in getting brands by category in services");
    }
};

// GET ALL  CATEGORIES

const getAllBrands = async (brandData) => {
    try {
        // const userVerifyStatus = await verifyUser(brandData.body.userID)
        // if (userVerifyStatus) {
            const response = await brands_controller.getAllBrands()
            return successResponse(response)
        // }

    } catch (error) {
        console.log("Error in get all brands in servicess.....!", error)
        return errorResponse("Error in get all brands in servicess")
    }
};

// SEARCH  CATEGORIES DETAILS

const searchBrandsDetails = async (brandData) => {
    try {
        const userVerifyStatus = await verifyUser(brandData.body.userID)
        if (userVerifyStatus) {
            const Response = await brands_controller.searchBrandsDetails(brandData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search brands in  servicess.....!", error)
        return errorResponse("Error in search brands in  servicess")
    }
};


module.exports = {
    getBrandsById,
    getAllBrands,
    getBrandwithPagination,
    searchBrandsDetails,

}