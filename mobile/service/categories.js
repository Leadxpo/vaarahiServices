const categories_controller = require("../controller/categories");
const { successResponse, errorResponse } = require("./response")
const { verifyUser } = require("./userVerfication")

// GET  CATEGORIES BY ID

const getCategoriesById = async (categoryData) => {
    try {
        const response = await categories_controller.getCategoriesById(categoryData.body.category_id)
        return successResponse(response)

    } catch (error) {
        console.log("Error in get by id categories in  servicess.....!", error)
        return errorResponse("Error in get by id categories in servicess")
    }
};

// GET ALL  CATEGORIES

const getAllCategories = async (categoryData) => {
    try {
        // const userVerifyStatus = await verifyUser(categoryData.body.userID)
        // if (userVerifyStatus) {
        const response = await categories_controller.getAllCategories()
        return successResponse(response)
        // }

    } catch (error) {
        console.log("Error in get all categories in servicess.....!", error)
        return errorResponse("Error in get all categories in servicess")
    }
};

const getCategorywithPagination = async (productData) => {
    try {
        const {page, limit } = productData.body;
        console.log("page :", page)
        console.log("limit :", limit)
        const pages = parseInt(page);
        const limits = parseInt(limit);
        const response = await categories_controller.getCategorywithPagination(pages, limits );

            return successResponse(response); // Return the success response
    } catch (error) {
        console.log("Error in service layer while fetching products: ", error);
        return errorResponse("Error in getting products by category in services");
    }
};



// SEARCH  CATEGORIES DETAILS

const searchCategoriesDetails = async (categoryData) => {
    try {
        const userVerifyStatus = await verifyUser(categoryData.body.userID)
        if (userVerifyStatus) {
            const Response = await categories_controller.searchCategoriesDetails(categoryData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search categories in  servicess.....!", error)
        return errorResponse("Error in search categories in  servicess")
    }
};


module.exports = {
    getCategoriesById,
    getAllCategories,
    getCategorywithPagination,
    searchCategoriesDetails,

}