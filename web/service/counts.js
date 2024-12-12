const count_Controller = require("../controller/count");
const {  verifyToken } = require("../service/jwttoken")
const { successResponse, errorResponse } = require("./response")

// COUNT

const getallCounts = async (countData) => {
    try {
        const token = countData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin" || decodedData.role === "user" || decodedData.role === "deliveryPartner") {
            const Response = await count_Controller.countDetails()
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in count in servicess.....!", error)
        return errorResponse("Error in count in servicess")
    }
};



module.exports = {
    getallCounts,
}