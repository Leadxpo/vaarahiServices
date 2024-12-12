const staff_Controller = require("../controller/deliveryStaff");
const bcrypt = require("bcrypt")
const shortUUID = require('short-uuid');
const { generateAccessToken, generateRefreshToken, verifyToken } = require("./jwttoken")
const { successResponse, errorResponse } = require("./response")
const {deleteImage} =require('./deleteimages')

// CREATE staff

const createStaff = async (staffData) => {
    try {
        const token = staffData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        const count = await staff_Controller.countStaffDetails()
        if (decodedData.role === "admin") {
            const translator = shortUUID();
            const staffId = translator.new();
            staffData.body.id = staffId;
            staffData.body.staff_id = "VMDEV000"+(parseInt(count)+1);

            if (staffData.file) {
                staffData.body.image = staffData.file.filename
            }

            if (staffData.body.password) {
                staffData.body.password = await passwordEncryption(staffData.body.password)
            }

            // single image
            const response = await staff_Controller.createStaff(staffData.body);
            return successResponse(response);
        }
        return errorResponse("access denaine....!")

    }
    catch (error) {
        console.log("Error in create staff in services..", error)
        return errorResponse("Error in create staff in services..")
    }
}

// LOGIN PAGE

const staffLogin = async (staffData) => {

    try {
        const staffPhoneNoController = await staff_Controller.staffLogin(staffData.staff_id)

        if (staffPhoneNoController) {
            const validatePassword = await comparePassword(
                staffData.password, staffPhoneNoController.password)

            if (validatePassword) {

                const accessToken = await generateAccessToken(
                    staffPhoneNoController.deliveryID,
                    staffPhoneNoController.name,
                    staffPhoneNoController.role)

                const refreshToken = await generateRefreshToken(
                    staffPhoneNoController.deliveryID,
                    staffPhoneNoController.name,
                    staffPhoneNoController.role)

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
        console.log("Error in staff login servicess...!", error)
        return errorResponse("Error in staff login servicess....")
    }
}

// UPDATE staff

const updateStaff = async (staffData) => {
    try {
        const token = staffData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }

        if (staffData.file) {
            const getStaffDate = await staff_Controller.getStaffById(staffData.body.id)
            if (getStaffDate.image !== null) {
                await deleteImage(`staffDP/${getStaffDate.image}`)
                staffData.body.image = staffData.file.filename
            }
            else {
                staffData.body.image = staffData.file.filename
            }
        }

        if (decodedData.role === "admin" || decodedData.role === "delivertPartner") {
            if (staffData.body.password) {
                staffData.body.password = await passwordEncryption(staffData.body.password)
            } 
            const updatedData = await staff_Controller.updateStaff(staffData.body.id, staffData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update staff in servicess.....!", error)
        return errorResponse("Error in update staff in servicess")
    }
};

// DELETE staff

const deleteStaff = async (staffData) => {
    try {
        const token = staffData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
           const  deleteData={status:"inactive"}
            const deletedData = await staff_Controller.deleteStaff(staffData.body.staff_id, deleteData)
            return successResponse(deletedData)
        }
    } catch (error) {
        console.log("Error in delete staff in  servicess.....!", error)
        return errorResponse("Error in delete staff in  servicess")
    }
};

// GET staff BY ID

const getStaffById = async (staffData) => {
    try {
        const token = staffData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin" ||  decodedData.role === "delivertPartner") {
            const response = await staff_Controller.getStaffById(staffData.body.id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id staff in  servicess.....!", error)
        return errorResponse("Error in get by id staff in servicess")
    }
};

// GET ALL staffS

const getAllStaff = async (staffData) => {
    try {
        const token = staffData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
            const response = await staff_Controller.getAllStaff()
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all staff in  servicess.....!", error)
        return errorResponse("Error in get all staff in servicess")
    }
};

// SEARCH EMPLOYE DETAILS

const searchStaffDetails = async (staffData) => {
    try {
        const token = staffData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
            const employeeResponse = await staff_Controller.searchStaffDetails(staffData.body)
            return successResponse(employeeResponse)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in surch staff in servicess.....!", error)
        return errorResponse("Error in surch staff in servicess")
    }
};

// COUNT

const countStaffDetails = async (staffData) => {
    try {
        const token = staffData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
            const Response = await staff_Controller.countStaffDetails()
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in count in servicess.....!", error)
        return errorResponse("Error in count in servicess")
    }
};

// RESET PASSWORD

const resetPassword = async (staffData) => {
    try {
        const token = staffData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        const getStaffDate = await staff_Controller.getStaffById(decodedData.id)
        const validatePassword = await comparePassword(
            staffData.body.oldPassword,
            getStaffDate.password)

        if (validatePassword) {
            if (staffData.body.newPassword == staffData.body.confirmPassword) {
                const hashedpassword = await passwordEncryption(staffData.body.newPassword)
                const newPassword = { password: hashedpassword }
                const updateResetpassword = await staff_Controller.updateStaff(getStaffDate.id, newPassword)
                return successResponse(updateResetpassword)
            }
            else {
                return errorResponse("conform password is not matched")
            }
        }
        else {
            return errorResponse("invalied Password")
        }
    }
    catch (error) {
        console.log("Error in reset password in  servicess.....!", error)
        return errorResponse("Error in reset password in  servicess")
    }
}

// GENARETE ACCESS TOKEN

const generateAccessTokenUsingRefreshToken = async (staffData) => {
    try {
        const token = staffData.headers.authorization;
        if (!token) {
            return errorResponse("Missing token");
        }
        const decodedData = await verifyToken(
            token,
            process.env.JWT_REFRESH_SECRETE_KEY
        );
        if (decodedData === "invalidtoken") {
            return errorResponse(decodedData);
        }
        console.log(decodedData);
        const accessToken = generateAccessToken(
            decodedData.id,
            decodedData.role,
            decodedData.name,
        );
        const refreshToken = generateRefreshToken(
            decodedData.id,
            decodedData.role,
            decodedData.name,
        );

        let data = {
            message: "Successfully generated access token using refresh token",
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
        return successResponse(data);
    } catch (error) {
        console.log("Unable to generate access token", error);
        return errorResponse("Unable to generate access token");
    }
};

// COMPARE PASSWORD

const comparePassword = async (password, encriptedpassword) => {
    try {
        const validatepassword = await bcrypt.compare(password, encriptedpassword)
        return validatepassword;
    } catch (error) {
        console.log("error in the compare password")
    }
}

// PASSWORD ENCRIPTION

const passwordEncryption = (password) => {
    saltRound = 10;
    const hashcode = bcrypt.hash(password, saltRound)
    console.log(hashcode)
    return hashcode;
}


module.exports = {
    createStaff,
    staffLogin,
    updateStaff,
    searchStaffDetails,
    deleteStaff,
    countStaffDetails,
    getAllStaff,
    getStaffById,
    resetPassword,
    generateAccessTokenUsingRefreshToken,
}