const reviewController = require("../controller/review");
const shortUUID = require('short-uuid');
const { successResponse, errorResponse } = require("./response")
const {  verifyToken } = require("../service/jwttoken")
// CREATE review

const createReview = async (reviewData) => {
    try {

        const token = reviewData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
            const translator = shortUUID();
            const reviewId = translator.new();
            reviewData.body.id = reviewId;

            const response = await reviewController.createReview(reviewData.body);
            return successResponse(response);
        }
        return errorResponse("access denaine....!")
    }
    catch (error) {
        console.log("Error in create review in services..", error)
        return errorResponse("Error in create review in services..")
    }
}
// UPDATE review

const updateReview = async (reviewData) => {
    try {
        const token = reviewData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
            const updatedData = await reviewController.updateReview(reviewData.body.id, reviewData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update review .....!", error)
        return errorResponse("Error in update review")
    }
};

// DELETE review

const deleteReview = async (reviewData) => {
    try {
        const token = reviewData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
            const deletedData = await reviewController.deleteReview(reviewData.body.id, reviewData.body)
            return successResponse(deletedData)
        }
    } catch (error) {
        console.log("Error in delete review in  servicess.....!", error)
        return errorResponse("Error in delete review in  servicess")
    }
};

// GET review BY ID

const getReviewById = async (reviewData) => {
    try {
        const token = reviewData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
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
            const response = await reviewController.getAllReview()
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
        const token = reviewData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
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
        const token = reviewData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
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
    createReview,
    updateReview,
    searchReviewDetails,
    deleteReview,
    countReviewDetails,
    getAllReview,
    getReviewById,
}