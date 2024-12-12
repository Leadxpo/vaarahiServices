const admin_Controller = require("../controller/adminStaff");
const bcrypt = require("bcrypt")
const shortUUID = require('short-uuid');
const { generateAccessToken, generateRefreshToken, verifyToken } = require("./jwttoken")
const { successResponse, errorResponse } = require("./response")

// CREATE admin

const createAdmin = async (adminData) => {
    try {
        const translator = shortUUID();
        const adminId = translator.new();
        adminData.body.id = adminId;

        if (adminData.body.password) {
            adminData.body.password = await passwordEncryption(adminData.body.password)
        }
        // single image
        const response = await admin_Controller.createAdmin(adminData.body);
        return successResponse(response);
    }
    catch (error) {
        console.log("Error in create admin in services..", error)
        return errorResponse("Error in create admin in services..")
    }
}

// LOGIN PAGE

const adminLogin = async (adminData) => {

    try {
        const adminPhoneNoController = await admin_Controller.adminLogin(adminData.phone_no)

        if (adminPhoneNoController) {
            const validatePassword = await comparePassword(
                adminData.password, adminPhoneNoController.password)

            if (validatePassword) {

                const accessToken = await generateAccessToken(
                    adminPhoneNoController.id,
                    adminPhoneNoController.name,
                    adminPhoneNoController.role)

                const refreshToken = await generateRefreshToken(
                    adminPhoneNoController.id,
                    adminPhoneNoController.name,
                    adminPhoneNoController.role)

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
        console.log("Error in admin login servicess...!", error)
        return errorResponse("Error in admin login servicess....")
    }
}

// UPDATE admin

const updateAdmin = async (adminData) => {
    try {
        const token = adminData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role==="admin") {
            if (adminData.body.password) {
                adminData.body.password = await passwordEncryption(adminData.body.password)
            }else{
                adminData.body.password =null
            }
            const updatedData = await admin_Controller.updateAdmin(adminData.body.id, adminData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update admin in servicess.....!", error)
        return errorResponse("Error in update admin in servicess")
    }
};

// DELETE admin

const deleteAdmin = async (adminData) => {
    try {
        const token = adminData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role==="admin") {
            const deletedData = await admin_Controller.deleteAdmin(adminData.body.id, adminData.body)
            return successResponse(deletedData)
        }
    } catch (error) {
        console.log("Error in delete admin in  servicess.....!", error)
        return errorResponse("Error in delete admin in  servicess")
    }
};

// GET admin BY ID

const getAdminById = async (adminData) => {
    try {
        const token = adminData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role==="admin") {
            const response = await admin_Controller.getAdminById(adminData.body.id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id admin in  servicess.....!", error)
        return errorResponse("Error in get by id admin in servicess")
    }
};

// GET ALL adminS

const getAllAdmin = async (adminData) => {
    try {
        const token = adminData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role == "admin") {
            const response = await admin_Controller.getAllAdmin()
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all admin in  servicess.....!", error)
        return errorResponse("Error in get all admin in servicess")
    }
};

// GET admin BY ID

const getLoginAdminDetails = async (adminData) => {
    try {
        const token = adminData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        const response = await admin_Controller.getAdminById(decodedData.id)
        return successResponse(response)

    } catch (error) {
        console.log("Error in get all admin in  servicess.....!", error)
        return errorResponse("Error in get all admin in servicess")
    }
};

// SEARCH EMPLOYE DETAILS

const searchAdminDetails = async (adminData) => {
    try {
        const token = adminData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role==="admin") {
            const employeeResponse = await admin_Controller.searchAdminDetails(adminData.body)
            return successResponse(employeeResponse)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in surch admin in servicess.....!", error)
        return errorResponse("Error in surch admin in servicess")
    }
};

// COUNT

const countAdminDetails = async (adminData) => {
    try {
        const token = adminData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role==="admin") {
            const Response = await admin_Controller.countAdminDetails()
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in count in servicess.....!", error)
        return errorResponse("Error in count in servicess")
    }
};

// RESET PASSWORD

const resetPassword = async (adminData) => {
    try {
        const token = adminData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        const getAdminDate = await admin_Controller.getAdminById(decodedData.id)
        const validatePassword = await comparePassword(
            adminData.body.oldPassword,
            getAdminDate.password)

        if (validatePassword) {
            if (adminData.body.newPassword == adminData.body.confirmPassword) {
                const hashedpassword = await passwordEncryption(adminData.body.newPassword)
                const newPassword = { password: hashedpassword }
                const updateResetpassword = await admin_Controller.updateAdmin(getAdminDate.id, newPassword)
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

const generateAccessTokenUsingRefreshToken = async (adminData) => {
    try {
        const token = adminData.headers.authorization;
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
    createAdmin,
    adminLogin,
    updateAdmin,
    searchAdminDetails,
    deleteAdmin,
    countAdminDetails,
    getAllAdmin,
    getAdminById,
    resetPassword,
    generateAccessTokenUsingRefreshToken,
    getLoginAdminDetails,
}