const userController = require("../controller/users");
const deliveryStaffController = require("../controller/deliveryStaff");

const verifyUser = async(userID)=>{
    const isUserExisit= await userController.getUserById(userID)
    if (isUserExisit !==null) {
        return true
    } else {
        return false
   
    }
}
const verifyDeliveryStaff = async(StaffID)=>{
    const isStaffExisit= await deliveryStaffController.getStaffById(StaffID)
    if (isStaffExisit !==null) {
        return true
    } else {
        return false
   
    }
}


module.exports={
    verifyUser,verifyDeliveryStaff
}