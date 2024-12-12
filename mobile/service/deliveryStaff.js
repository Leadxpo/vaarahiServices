const staff_Controller = require("../controller/deliveryStaff");
const bcrypt = require("bcrypt")
const { successResponse, errorResponse } = require("./response")
const { verifyDeliveryStaff } = require("./userVerfication")
// LOGIN PAGE

const staffLogin = async (staffData) => {

    try {
        const staffPhoneNoController = await staff_Controller.staffLogin(staffData.staff_id)

        if (staffPhoneNoController) {
            const validatePassword = await comparePassword(
                staffData.password, staffPhoneNoController.password)

            if (validatePassword) {
                return successResponse(staffPhoneNoController)
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
        const deliveryStaffVerifyStatus = await verifyDeliveryStaff(staffData.body.staff_id)
        if (deliveryStaffVerifyStatus) {
            if (staffData.body.password) {
                staffData.body.password = await passwordEncryption(staffData.body.password)
            } 
            const updatedData = await staff_Controller.updateStaff(staffData.body.staff_id, staffData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update staff in servicess.....!", error)
        return errorResponse("Error in update staff in servicess")
    }
};

// GET staff BY ID

const getStaffById = async (staffData) => {
    try {
        const deliveryStaffVerifyStatus = await verifyDeliveryStaff(staffData.body.staffID)
        if (deliveryStaffVerifyStatus) {
            const response = await staff_Controller.getStaffById(staffData.body.staffID)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id staff in  servicess.....!", error)
        return errorResponse("Error in get by id staff in servicess")
    }
};

// COUNT

const countStaffDetails = async (staffData) => {
    try {
        const deliveryStaffVerifyStatus = await verifyDeliveryStaff(staffData.body.staff_id)
        if (deliveryStaffVerifyStatus) {
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
        const getStaffDate = await staff_Controller.getStaffById(staffData.body.staff_id)
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
    staffLogin,
    updateStaff,
    countStaffDetails,
    getStaffById,
    resetPassword,
}