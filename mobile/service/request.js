const request_controller = require("../controller/request");
const shortUUID = require('short-uuid');
const {  verifyToken } = require("./jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")
const { verifyDeliveryStaff } = require("./userVerfication")

// CREATE REQUEST AMOUNT

const createrequest = async (requestData) => {
    try {
        const staffVerifyStatus = await verifyDeliveryStaff(requestData.body.staffID)
        if (staffVerifyStatus) {
            const response = await request_controller.createrequest(requestData.body);
            return successResponse(response);
        }else{
            return errorResponse("access Denain........")
        }
    }
    catch (error) {
        console.log("Error in create request in services..", error)
        return errorResponse("Error in create request in services..")
    }
}

// UPDATE REQUEST AMOUNT

const updaterequest = async (requestData) => {
    try {
        const staffVerifyStatus = await verifyDeliveryStaff(requestData.body.staffID)
        if (staffVerifyStatus) {
            const updatedData = await request_controller.updaterequest(requestData.body.id, requestData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update request in servicess.....!", error)
        return errorResponse("Error in update request in servicess")
    }
};

// DELETE REQUEST AMOUNT

const deleterequest = async (requestData) => {
    try {
        const staffVerifyStatus = await verifyDeliveryStaff(requestData.body.staffID)
        if (staffVerifyStatus) {
            const deletedData = await request_controller.deleterequest(requestData.body.id)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete request in  servicess.....!", error)
        return errorResponse("Error in delete request in servicess")
    }
};

// GET REQUEST AMOUNT BY ID

const getrequestById = async (requestData) => {
    try {
        const staffVerifyStatus = await verifyDeliveryStaff(requestData.body.staffID)
        if (staffVerifyStatus) {
            const response = await request_controller.getrequestById(requestData.body.id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id request in  servicess.....!", error)
        return errorResponse("Error in get by id request in servicess")
    }
};

// GET ALL REQUEST AMOUNTS
const getAllrequestsByStaffID = async (requestData) => {
    try {
        const staffVerifyStatus = await verifyDeliveryStaff(requestData.body.staffID)
        if (staffVerifyStatus) {
            const response = await request_controller.getAllrequestsByStaffID(requestData.body.staffID)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id request in  servicess.....!", error)
        return errorResponse("Error in get by id request in servicess")
    }
};
const getPendingRequestsByStaffID = async (requestData) => {
    try {
        const staffVerifyStatus = await verifyDeliveryStaff(requestData.body.staffID)
        if (staffVerifyStatus) {
            const response = await request_controller.getPendingRequestsByStaffID(requestData.body.staffID)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id request in  servicess.....!", error)
        return errorResponse("Error in get by id request in servicess")
    }
};

module.exports = {
    createrequest,
    updaterequest,
    deleterequest,
    getrequestById,
    getPendingRequestsByStaffID,
    getAllrequestsByStaffID
}