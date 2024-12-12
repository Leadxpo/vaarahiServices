const userRemoveRequestController = require("../controller/usersRemoveRequest");
const shortUUID = require('short-uuid');
const { successResponse, errorResponse } = require("./response")
const { verifyUser } = require("../service/userVerfication")
// CREATE userRemoveRequest

const createUserRemoveRequest = async (userRemoveRequestData) => {
    console.log("body : ", userRemoveRequestData.body)
    try {
        const userID = userRemoveRequestData.body.userID;
        const userVerifyStatus = await verifyUser(userRemoveRequestData.body.userID)
        if (userVerifyStatus) {
            userRemoveRequestData.body.user_id = userRemoveRequestData.body.userID;
            const response = await userRemoveRequestController.createUserRemoveRequest(userRemoveRequestData.body);
            return successResponse(response);
        }
    }
    catch (error) {
        console.log("Error in create userRemoveRequest in services..", error)
        return errorResponse("Error in create userRemoveRequest in services..")
    }
}
// UPDATE userRemoveRequest

const updateUserRemoveRequest = async (userRemoveRequestData) => {

    try {
        const userVerifyStatus = await verifyUser(userRemoveRequestData.body.userID)
        if (userVerifyStatus) {
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
        const userVerifyStatus = await verifyUser(userRemoveRequestData.body.userID)
        if (userVerifyStatus) {

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