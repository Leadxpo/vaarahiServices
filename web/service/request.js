const banner_controller = require("../controller/banners");
const shortUUID = require('short-uuid');
const {  verifyToken } = require("./jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")


// CREATE REQUEST AMOUNT

const createrequest = async (bannerData) => {
    try {
        const token = bannerData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role == "admin") {

            if (bannerData.file) {
                bannerData.body.image = bannerData.file.filename
            }

            const response = await banner_controller.createrequest(bannerData.body);
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

const updaterequest = async (bannerData) => {
    try {
        const token = bannerData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role == "admin") {

            if (bannerData.file) {
                const getUserDate = await banner_controller.getrequestById(bannerData.body.id)

                if (getUserDate.image !== null) {
                    await deleteImage(getUserDate.image)
                    bannerData.body.image = bannerData.file.filename
                }
                else {
                    bannerData.body.image = bannerData.file.filename
                }
            }
            const updatedData = await banner_controller.updaterequest(bannerData.body.id, bannerData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update request in servicess.....!", error)
        return errorResponse("Error in update request in servicess")
    }
};

// DELETE REQUEST AMOUNT

const deleterequest = async (bannerData) => {
    try {
        const token = bannerData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }

        if (decodedData.role == "admin") {
            const deletedData = await banner_controller.deleterequest(bannerData.body.id)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete request in  servicess.....!", error)
        return errorResponse("Error in delete request in servicess")
    }
};

// DELETE REQUEST AMOUNT BY REQUEST AMOUNT NAME

const getrequestByName = async (bannerData) => {
    try {
        const token = bannerData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }

        if (decodedData.role==="admin" || decodedData.role==="user" || decodedData.role==="deliveryPartner") {
            const deletedData = await banner_controller.getrequestByName(bannerData.body.title)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete request in  servicess.....!", error)
        return errorResponse("Error in delete request in servicess")
    }
};

// GET REQUEST AMOUNT BY ID

const getrequestById = async (bannerData) => {
    try {
        const token = bannerData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role==="admin" || decodedData.role==="user" || decodedData.role==="deliveryPartner") {
            const response = await banner_controller.getrequestById(bannerData.body.id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id request in  servicess.....!", error)
        return errorResponse("Error in get by id request in servicess")
    }
};

// GET ALL REQUEST AMOUNTS
const getAllrequests = async (bannerData) => {
    try {
        const token = bannerData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role==="admin" || decodedData.role==="user" || decodedData.role==="deliveryPartner") {
            const response = await banner_controller.getAllrequests()
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
    getrequestByName,
    getrequestById,
    getAllrequests
}