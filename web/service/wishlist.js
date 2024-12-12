const wishlist_controller = require("../controller/wishlist");
const categories_controller = require("../controller/categories");
const {  verifyToken } = require("../service/jwttoken")
const { successResponse, errorResponse } = require("./response");
// const csv = require('csv-parser');
// const fs = require('file-system');

// CREATE PRODUCT
const createWishlist = async (wishlistData) => {
    try {
        const token = wishlistData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token");
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData);
        }
        if (decodedData.role == "admin") {
            const response = await wishlist_controller.createWishlist(wishlistData.body);
            return successResponse(response);
        }
    } catch (error) {
        console.log("Error in create  wishlists..", error);
        return errorResponse("Error in create wishlists..");
    }
};

// UPDATE PRODUCT
const updateWishlist = async (wishlistData) => {
    try {
        const token = wishlistData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token");
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData);
        }
        if (decodedData.role == "admin") {
            const updatedData = await wishlist_controller.updateWishlist(wishlistData.body.id, wishlistData.body);
            return successResponse(updatedData);
        }
        return errorResponse("access denied....!");
    } catch (error) {
        console.log("Error in update Wishlist in services.....!", error);
        return errorResponse("Error in update Wishlist in services");
    }
};

// DELETE PRODUCT
const deleteWishlist = async (wishlistData) => {
    try {
        const token = wishlistData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token");
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData);
        }
        if (decodedData.role == "admin") {
            const deleteData = { status: 'inactive' }
            const deletedData = await wishlist_controller.deleteWishlist(wishlistData.body.id, deleteData);
            return successResponse(deletedData);
        }
        return errorResponse("access denied...!");
    } catch (error) {
        console.log("Error in delete Wishlist in services.....!", error);
        return errorResponse("Error in delete Wishlist in services");
    }
};

// GET PRODUCT BY ID

const getWishlistById = async (wishlistData) => {
    try {
        const token = wishlistData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token");
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData);
        }

        if (decodedData.role === "admin" || decodedData.role === "user" || decodedData.role === "deliveryPartner") {
            const response = await wishlist_controller.getWishlistById(wishlistData.body.id);
            return successResponse(response);
        }

    } catch (error) {
        console.log("Error in get by id Wishlist in services.....!", error);
        return errorResponse("Error in get by id Wishlist in services");
    }
};

// GET ALL PRODUCTS

const getAllWishlist = async (wishlistData) => {
    try {
        const token = wishlistData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token");
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData);
        }
        if (decodedData.role === "admin" || decodedData.role === "user" || decodedData.role === "deliveryPartner") {
            const response = await wishlist_controller.getAllWishlist(wishlistData.body);
            return successResponse(response);
        }
    } catch (error) {
        console.log("Error in get all Wishlist in services.....!", error);
        return errorResponse("Error in get all Wishlist in services");
    }
};

// SEARCH PRODUCT DETAILS

const searchWishlistDetails = async (wishlistData) => {
    try {
        const token = wishlistData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token");
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData);
        }
        if (decodedData.role === "admin" || decodedData.role === "user" || decodedData.role === "deliveryPartner") {
            const Response = await wishlist_controller.searchWishlistDetails(wishlistData.body);
            return successResponse(Response);
        }
        return errorResponse("access denied...!");
    } catch (error) {
        console.log("Error in search Wishlist in services.....!", error);
        return errorResponse("Error in search Wishlist in services");
    }
};

// const bulkWishlistUpload = async (wishlistData, res) => {
//     try {
//         const token = wishlistData.headers.authorization;
//         if (!token) {
//             return errorResponse("Missing Token");
//         }
//         const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
//         if (decodedData == "invalidtoken") {
//             return errorResponse(decodedData);
//         }
//         if (decodedData.role == "admin") {
//             const results = [];
//             const wishlistCSV = fs.createReadStream(wishlistData.file.path).pipe(csv({}));
//             for await (const row of wishlistCSV) {
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
//             const response = await wishlist_controller.bulkWishlistUpload(results);
//             return successResponse(response);
//         }
//         return errorResponse("Access denied....!");
//     } catch (error) {
//         console.log("Error in bulk upload wishlist in services.....!", error);
//         return errorResponse("Error in bulk upload wishlist in services");
//     }
// };

module.exports = {
    createWishlist,
    updateWishlist,
    deleteWishlist,
    getWishlistById,
    getAllWishlist,
    searchWishlistDetails,
    // bulkWishlistUpload,
}
