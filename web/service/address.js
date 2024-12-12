const address_controller = require("../controller/address");
const shortUUID = require('short-uuid');
const {  verifyToken } = require("../service/jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")


// CREATE address

const createAddress = async (addressData) => {
    try {
        
        if (decodedData.id === addressData.body.userID) {
            const response = await address_controller.createAddress(addressData.body);
            return successResponse(response);
        } else {
            return errorResponse("access Denain........")
        }
    }
    catch (error) {
        console.log("Error in create address in services..", error)
        return errorResponse("Error in create address in services..")
    }
}

// UPDATE address

const updateAddress = async (addressData) => {
    try {
        
        if (decodedData.id === addressData.body.userID) {
            const updatedData = await address_controller.updateAddress(addressData.body.id, addressData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update address in servicess.....!", error)
        return errorResponse("Error in update address in servicess")
    }
};

// DELETE address

const deleteAddress = async (addressData) => {
    try {
        

        if (decodedData.id === addressData.body.userID) {
            const deletedData = await address_controller.deleteAddress(addressData.body.id)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete address in  servicess.....!", error)
        return errorResponse("Error in delete address in servicess")
    }
};

// GET address BY ID

const getAddressById = async (addressData) => {
    try {
        
        if (decodedData.id === addressData.body.userID) {
            const response = await address_controller.getAddressById(addressData.body.id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id address in  servicess.....!", error)
        return errorResponse("Error in get by id address in servicess")
    }
};

const getAddressByUserId = async (addressData) => {
    try {
        
        if (decodedData.id === addressData.body.userID) {
            const response = await address_controller.getAddressByUserId(addressData.body.userID)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id address in  servicess.....!", error)
        return errorResponse("Error in get by id address in servicess")
    }
};

// GET ALL addressS
const getAllAddresss = async (addressData) => {
    try {
        
        if (decodedData.role === "admin") {
            const response = await address_controller.getAllAddresss()
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id address in  servicess.....!", error)
        return errorResponse("Error in get by id address in servicess")
    }
};

module.exports = {
    createAddress,
    updateAddress,
    deleteAddress,
    getAddressByUserId,
    getAddressById,
    getAllAddresss
}