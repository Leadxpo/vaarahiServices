const userController = require("../controller/users");
const shortUUID = require('short-uuid');
const { successResponse, errorResponse } = require("./response")
const { verifyUser } = require("./userVerfication")
const axios = require('axios');
const { deleteImage } = require("./deleteimages");

const sendOTP = async (phoneNumber, otp) => {
    try {
        const expireTime = Date.now() + (5 * 60 * 1000); // OTP expires in 5 minutes
        const OTPData = { phone_no: phoneNumber, OTP: otp, OTP_expiredate: expireTime };

        // Update OTP in the database
        var userOTPController = await userController.updateUserOTP(OTPData);

        // If OTP is successfully updated in the database, send the OTP via SMS Gateway
        const smsApiUrl = `http://control.yourbulksms.com/api/sendhttp.php?authkey=31386c2e636f6d35383593&mobiles=${phoneNumber}&message=Welcome to Vaarahi Mart! Your OTP for account verification is ${otp} . It is valid for 10 minutes. Please do not share this with anyone.&sender=VAAMAR&route=2&country=91&DLT_TE_ID=1707172830459211109`;
        const smsResponse = await axios.get(smsApiUrl);
        if (smsResponse.data.Status === "Success") {
            console.log("OTP sent successfully via SMS Gateway");
            return true; // OTP sent successfully
        } else {
            console.error("Failed to send OTP via SMS Gateway:", smsResponse.data);
            return false; // Failed to send OTP via SMS
        }
    } catch (error) {
        console.error("Failed to send OTP:", error);
        return false; // Return false if there was an error
    }
};

const generateOTP = () => {
    // Generate a random OTP
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
};


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
        const userVerifyStatus = await verifyUser(userData.body.userID)
        if (userVerifyStatus) {
            const updatedData = await userController.updateUser(userData.body.userID, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update user .....!", error)
        return errorResponse("Error in update user")
    }
};
const updateUserDP = async (userData) => {
    try {
        const userVerifyStatus = await verifyUser(userData.body.userID)
        if (userVerifyStatus) {
            if (userData.file) {
                const getUserDate = await userController.getUserById(userData.body.userID)

                if (getUserDate.image !== null) {
                    await deleteImage('userDP/'+getUserDate.image)
                    userData.body.image = userData.file.filename
                }
                else {
                    userData.body.image = userData.file.filename
                }
            }
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
        var userPhoneNoController = await userController.userLogin(userData.phone_no);
        console.log("phone_no : ", userData.phone_no);

        if (userPhoneNoController) {
            const OTP = await generateOTP();
            const isOTP = await sendOTP(userData.phone_no, OTP);

            if (isOTP) {
                const userOTPupdetedData = await userController.userLogin(userData.phone_no);
                return successResponse(userOTPupdetedData);
            } else {
                return errorResponse("User exists but unable to send OTP due to a technical problem.");
            }

        } else {
            console.log("No phone number found");
            const translator = shortUUID();
            const userId = translator.new();
            userData.id = userId;

            const response = await userController.createUser(userData);

            if (response) {
                console.log("User created successfully. Logging in new user.");
                userPhoneNoController = await userController.userLogin(userData.phone_no);

                if (userPhoneNoController) {
                    const OTP = await generateOTP();
                    const isOTP = await sendOTP(userData.phone_no, OTP);

                    if (isOTP) {
                        const userOTPupdetedData = await userController.userLogin(userData.phone_no);
                        return successResponse(userOTPupdetedData);
                    } else {
                        return errorResponse("User exists but unable to send OTP due to a technical problem.");
                    }

                } else {
                    return errorResponse("User created but login failed.");
                }
            } else {
                console.error("Failed to create user:", userData.phone_no);
                return errorResponse("Failed to create user with this phone number.");
            }
        }

    } catch (error) {
        console.log("Error in user login services...!", error);
        return errorResponse("Error in user login services....");
    }
};

// GET user BY ID
const getUserById = async (userData) => {
    try {
        const userVerifyStatus = await verifyUser(userData.body.userID)
        if (userVerifyStatus) {
            const response = await userController.getUserById(userData.body.userID)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id user in  servicess.....!", error)
        return errorResponse("Error in get by id user in servicess")
    }
};


module.exports = {
    createUser,
    updateUser,
    updateUserDP,
    userLogin,
    getUserById,
}