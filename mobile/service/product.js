const product_controller = require("../controller/product");
const categories_controller = require("../controller/categories");
const userController = require("../controller/users");
;
const { verifyUser } = require("./userVerfication")
const { successResponse, errorResponse } = require("./response");
// const csv = require('csv-parser');
// const fs = require('file-system');


// UPDATE PRODUCT
const updateProduct = async (productData) => {
    try {
        const userVerifyStatus = await verifyUser(productData.body.userID)
        if (userVerifyStatus) {
            const updatedData = await product_controller.updateProduct(productData.body.id, productData.body);
            return successResponse(updatedData);
        }
        return errorResponse("access denied....!");
    } catch (error) {
        console.log("Error in update Product in services.....!", error);
        return errorResponse("Error in update Product in services");
    }
};

// GET PRODUCT BY ID

const getProductById = async (productData) => {
    try {
        const productResponse = await product_controller.getProductById(productData.body.id);
        if (productResponse) {
            const variantResponse = await product_controller.getProductVariants(productResponse.product_id);
            // Structure the response with product and filtered variants
            const response = {
                product: productResponse,
                productVariants: variantResponse,
            };
            return successResponse(response);
        } else {
            return errorResponse("Product not found");
        }
    } catch (error) {
        console.log("Error in get by id Product in services.....!", error);
        return errorResponse("Error in get by id Product in services");
    }
};

const getProductByWishlist = async (productData) => {
    try {
        const userVerifyStatus = await verifyUser(productData.body.userID)
        console.log("userVerifyStatus : ",userVerifyStatus)
        if (userVerifyStatus) {
            const UserData= await userController.getUserById(productData.body.userID);
            console.log("userdata : ",UserData.wishList)
            const response = await product_controller.getProductByWishlist(UserData.wishList);
            // Structure the response with product and filtered variants
           
            return successResponse(response);
        } else {
            return errorResponse("Product not found");
        }
    } catch (error) {
        console.log("Error in get by id Product in services.....!", error);
        return errorResponse("Error in get by id Product in services");
    }
};

const getProductsByCategorywithPagination = async (productData) => {
    try {
        const { category, page, limit } = productData.body;
        console.log("category :", category)
        console.log("page :", page)
        console.log("limit :", limit)
        const pages = parseInt(page);
        const limits = parseInt(limit);
        const response = await product_controller.getProductsByCategorywithPagination( category, pages, limits );

            return successResponse(response); // Return the success response
    } catch (error) {
        console.log("Error in service layer while fetching products: ", error);
        return errorResponse("Error in getting products by category in services");
    }
};

// GET ALL PRODUCTS 

const getAllProduct = async (productData) => {
    try {
        // const userVerifyStatus = await verifyUser(productData.body.userID)
        // if (userVerifyStatus) {
        const response = await product_controller.getAllProduct();
        return successResponse(response);
        // }
    } catch (error) {
        console.log("Error in get all Product in services.....!", error);
        return errorResponse("Error in get all Product in services");
    }
};

// SEARCH PRODUCT DETAILS

const searchProductDetails = async (productData) => {
    try {
        const userVerifyStatus = await verifyUser(productData.body.userID)
        if (userVerifyStatus) {
            const Response = await product_controller.searchProductDetails(productData.body);
            return successResponse(Response);
        }
        return errorResponse("access denied...!");
    } catch (error) {
        console.log("Error in search Product in services.....!", error);
        return errorResponse("Error in search Product in services");
    }
};

// const bulkProductUpload = async (productData, res) => {
//     try {
//         const token = productData.headers.authorization;
//         if (!token) {
//             return errorResponse("Missing Token");
//         }
//         const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
//         if (decodedData == "invalidtoken") {
//             return errorResponse(decodedData);
//         }
//         if (decodedData.role == "admin") {
//             const results = [];
//             const productCSV = fs.createReadStream(productData.file.path).pipe(csv({}));
//             for await (const row of productCSV) {
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
//             const response = await product_controller.bulkProductUpload(results);
//             return successResponse(response);
//         }
//         return errorResponse("Access denied....!");
//     } catch (error) {
//         console.log("Error in bulk upload product in services.....!", error);
//         return errorResponse("Error in bulk upload product in services");
//     }
// };

module.exports = {
    updateProduct,
    getProductById,
    getProductByWishlist,
    getProductsByCategorywithPagination,
    getAllProduct,
    searchProductDetails,
    // bulkProductUpload,
}
