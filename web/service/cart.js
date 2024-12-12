const cart_controller = require("../controller/cart");
const categories_controller = require("../controller/categories");
const {  verifyToken } = require("../service/jwttoken")
const { successResponse, errorResponse } = require("./response");
// const csv = require('csv-parser');
// const fs = require('file-system');


// UPDATE PRODUCT
const updateCart = async (cartData) => {
    try {
        const token = cartData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token");
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData);
        }
        if (decodedData.role == "admin") {
            const updatedData = await cart_controller.updateCart(cartData.body.id, cartData.body);
            return successResponse(updatedData);
        }
        return errorResponse("access denied....!");
    } catch (error) {
        console.log("Error in update Cart in services.....!", error);
        return errorResponse("Error in update Cart in services");
    }
};

// GET PRODUCT BY ID

const getCartById = async (cartData) => {
    try {
        const token = cartData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token");
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData);
        }

        if (decodedData.role === "admin" || decodedData.role === "user" || decodedData.role === "deliveryPartner") {
            const response = await cart_controller.getCartById(cartData.body.id);
            return successResponse(response);
        }

    } catch (error) {
        console.log("Error in get by id Cart in services.....!", error);
        return errorResponse("Error in get by id Cart in services");
    }
};

// GET ALL PRODUCTS

const getAllCart = async (cartData) => {
    try {
        const token = cartData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token");
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData);
        }
        if (decodedData.role === "admin" || decodedData.role === "user" || decodedData.role === "deliveryPartner") {
            const response = await cart_controller.getAllCart(cartData.body);
            return successResponse(response);
        }
    } catch (error) {
        console.log("Error in get all Cart in services.....!", error);
        return errorResponse("Error in get all Cart in services");
    }
};

// SEARCH PRODUCT DETAILS

const searchCartDetails = async (cartData) => {
    try {
        const token = cartData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token");
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData);
        }
        if (decodedData.role === "admin" || decodedData.role === "user" || decodedData.role === "deliveryPartner") {
            const Response = await cart_controller.searchCartDetails(cartData.body);
            return successResponse(Response);
        }
        return errorResponse("access denied...!");
    } catch (error) {
        console.log("Error in search Cart in services.....!", error);
        return errorResponse("Error in search Cart in services");
    }
};

// const bulkCartUpload = async (cartData, res) => {
//     try {
//         const token = cartData.headers.authorization;
//         if (!token) {
//             return errorResponse("Missing Token");
//         }
//         const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
//         if (decodedData == "invalidtoken") {
//             return errorResponse(decodedData);
//         }
//         if (decodedData.role == "admin") {
//             const results = [];
//             const cartCSV = fs.createReadStream(cartData.file.path).pipe(csv({}));
//             for await (const row of cartCSV) {
//                 if (row.CostPrice) {
//                     const CostPrice = parseFloat(row.CostPrice);
//                     let SalePrice = parseFloat(row.SalePrice) || null;
//                     const Regularprice = parseFloat(row.Regularprice) || null;

//                     // Extract VAT percentage from TaxClass
//                     let CostIncVAT = CostPrice;
//                     if (row.TaxClass && row.TaxClass.includes('VAT')) {
//                         const vatPercentage = parseFloat(row.TaxClass.replace('VAT', ''));
//                         if (!isNaN(vatPercentage)) {
//                             // Convert percentage to multiplier and calculate CostIncVAT
//                             const vatMultiplier = 1 + (vatPercentage / 100);
//                             CostIncVAT = CostPrice * vatMultiplier;
//                         }
//                     }

//                     let priceToUse = SalePrice || Regularprice || 0;
//                     let Margin = 0;

//                     if (priceToUse > 0) {
//                         Margin = ((priceToUse - CostIncVAT) / CostIncVAT) * 100;
//                     }

//                     // Ensure margin is within a reasonable range and rounded to 2 decimal places
//                     Margin = parseFloat(Margin.toFixed(2));

//                     // Handle potential edge cases where margin might be too large or too small
//                     if (Margin > 9999.99) Margin = 9999.99;
//                     if (Margin < -9999.99) Margin = -9999.99;

//                     row.Margin = Margin;
//                     row.CostIncVAT = CostIncVAT;
//                 } else {
//                     row.Margin = 0;
//                     row.CostIncVAT = 0;
//                 }
//                 results.push(row);
//             }
//             const response = await cart_controller.bulkCartUpload(results);
//             return successResponse(response);
//         }
//         return errorResponse("Access denied....!");
//     } catch (error) {
//         console.log("Error in bulk upload cart in services.....!", error);
//         return errorResponse("Error in bulk upload cart in services");
//     }
// };

module.exports = {
    updateCart,
    getCartById,
    getAllCart,
    searchCartDetails,
}
