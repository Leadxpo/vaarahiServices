const reviewController = require("../controller/review");
const { successResponse, errorResponse } = require("./response")
const { verifyUser } = require("./userVerfication")

// UPDATE review

const createReview = async (reviewData) => {
    try {
        const userVerifyStatus = await verifyUser(reviewData.body.userID)
        if (userVerifyStatus) {
            reviewData.body.user_id=reviewData.body.userID;
            const createData = await reviewController.createReview(reviewData.body)
            return successResponse(createData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update review .....!", error)
        return errorResponse("Error in update review")
    }
};

// UPDATE review

const updateReview = async (reviewData) => {
    try {
        const userVerifyStatus = await verifyUser(reviewData.body.userID)
        if (userVerifyStatus) {
            const updatedData = await reviewController.updateReview(reviewData.body.id, reviewData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update review .....!", error)
        return errorResponse("Error in update review")
    }
};

// GET review BY ID

const getReviewById = async (reviewData) => {
    try {
        const userVerifyStatus = await verifyUser(reviewData.body.userID)
        if (userVerifyStatus) {
            const response = await reviewController.getReviewById(reviewData.body.id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id review in  servicess.....!", error)
        return errorResponse("Error in get by id review in servicess")
    }
};

// GET ALL review

const getAllReview = async (reviewData) => {
    try {
        const token = reviewData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role == "admin") {
            const response = await reviewController.getAllReview(reviewData.body)
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all review in  servicess.....!", error)
        return errorResponse("Error in get all review in servicess")
    }
};

// SEARCH EMPLOYE DETAILS

const searchReviewDetails = async (reviewData) => {
    try {
        const userVerifyStatus = await verifyUser(reviewData.body.userID)
        if (userVerifyStatus) {
            const employeeResponse = await reviewController.searchReviewDetails(reviewData.body)
            return successResponse(employeeResponse)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in surch review in servicess.....!", error)
        return errorResponse("Error in surch review in servicess")
    }
};

// COUNT

const countReviewDetails = async (reviewData) => {
    try {
        const userVerifyStatus = await verifyUser(reviewData.body.userID)
        if (userVerifyStatus) {
            const Response = await reviewController.countReviewDetails()
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in count in reviews.....!", error)
        return errorResponse("Error in count in reviews")
    }
};

module.exports = {
    updateReview, createReview,
    searchReviewDetails,
    countReviewDetails,
    getAllReview,
    getReviewById,
}