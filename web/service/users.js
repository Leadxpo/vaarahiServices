const userController = require("../controller/users");
const shortUUID = require('short-uuid');
const { successResponse, errorResponse } = require("./response")
const {  verifyToken } = require("../service/jwttoken")
// CREATE user

const createUser = async (userData) => {
    try {
        const translator = shortUUID();
        const userId = translator.new();
        userData.body.id = userId;

        const response = await userController.createUser(userData.body);
        return successResponse(response);
    }
    catch (error) {
        console.log("Error in create user in services..", error)
        return errorResponse("Error in create user in services..")
    }
}
// UPDATE user

const updateUser = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
            const updatedData = await userController.updateUser(userData.body.userID, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update user .....!", error)
        return errorResponse("Error in update user")
    }
};

const userLogin = async (userData) => {

    try {
        const userPhoneNoController = await user_Controller.userLogin(userData.phone_no)

        if (userPhoneNoController) {
            const validatePassword = await comparePassword(
                userData.password, userPhoneNoController.password)

            if (validatePassword) {

                const accessToken = await generateAccessToken(
                    userPhoneNoController.id,
                    userPhoneNoController.name,
                    userPhoneNoController.role)

                const refreshToken = await generateRefreshToken(
                    userPhoneNoController.id,
                    userPhoneNoController.name,
                    userPhoneNoController.role)

                const data = {
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }
                return successResponse(data)
            }
            else {

                return errorResponse("invalid password")
            }
        }
        else {
            return errorResponse("invalid Email")
        }

    } catch (error) {
        console.log("Error in user login servicess...!", error)
        return errorResponse("Error in user login servicess....")
    }
}

// DELETE user

const deleteUser = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.id === userData.body.userID) {
            const deletedData = await userController.deleteUser(userData.body.userID, userData.body)
            return successResponse(deletedData)
        }
    } catch (error) {
        console.log("Error in delete user in  servicess.....!", error)
        return errorResponse("Error in delete user in  servicess")
    }
};

// GET user BY ID

const getUserById = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.id === userData.body.userID) {
            const response = await userController.getUserById(userData.body.userID)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id user in  servicess.....!", error)
        return errorResponse("Error in get by id user in servicess")
    }
};

// GET ALL user

const getAllUser = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role == "admin") {
            const response = await userController.getAllUser()
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all user in  servicess.....!", error)
        return errorResponse("Error in get all user in servicess")
    }
};
// SEARCH EMPLOYE DETAILS

const searchUserDetails = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
            const employeeResponse = await userController.searchUserDetails(userData.body)
            return successResponse(employeeResponse)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in surch user in servicess.....!", error)
        return errorResponse("Error in surch user in servicess")
    }
};

// COUNT

const countUserDetails = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
            const Response = await userController.countUserDetails()
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in count in users.....!", error)
        return errorResponse("Error in count in users")
    }
};

module.exports = {
    createUser,
    updateUser,
    userLogin,
    searchUserDetails,
    deleteUser,
    countUserDetails,
    getAllUser,
    getUserById,
}