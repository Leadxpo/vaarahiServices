const userRemoveRequestController = require("../controller/usersRemoveRequest");
const shortUUID = require('short-uuid');
const { successResponse, errorResponse } = require("./response")
const {  verifyToken } = require("../service/jwttoken")
// CREATE userRemoveRequest

const createUserRemoveRequest = async (userRemoveRequestData) => {
    try {
        const response = await userRemoveRequestController.createUserRemoveRequest(userRemoveRequestData.body);
        return successResponse(response);
    }
    catch (error) {
        console.log("Error in create userRemoveRequest in services..", error)
        return errorResponse("Error in create userRemoveRequest in services..")
    }
}
// UPDATE userRemoveRequest

const updateUserRemoveRequest = async (userRemoveRequestData) => {
    try {
        const token = userRemoveRequestData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
            const updatedData = await userRemoveRequestController.updateUserRemoveRequest(userRemoveRequestData.body.userID, userRemoveRequestData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update userRemoveRequest .....!", error)
        return errorResponse("Error in update userRemoveRequest")
    }
};



// GET ALL userRemoveRequest

const getAllUserRemoveRequest = async (userRemoveRequestData) => {
    try {
        const token = userRemoveRequestData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role == "admin") {
            const response = await userRemoveRequestController.getAllUserRemoveRequest()
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all userRemoveRequest in  servicess.....!", error)
        return errorResponse("Error in get all userRemoveRequest in servicess")
    }
};

module.exports = {
    createUserRemoveRequest,
    updateUserRemoveRequest,
    getAllUserRemoveRequest,
}