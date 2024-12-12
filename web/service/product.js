const product_controller = require("../controller/product");
const categories_controller = require("../controller/categories");
const { verifyToken } = require("../service/jwttoken")
const { successResponse, errorResponse } = require("./response");
const { Storage } = require('@google-cloud/storage');
require('dotenv').config({ path: '../../.env' }); // Path to .env from productService.js

// Google Cloud Storage configuration
const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_KEY_FILE
});
const bucketName = process.env.GCLOUD_BUCKET_NAME;

// CREATE PRODUCT
const createProduct = async (productData) => {
    try {
        const token = productData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token");
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData);
        }
        if (decodedData.role == "admin") {
            if (!productData.file) {
                return errorResponse("No file uploaded.");
            }

            const bucket = storage.bucket(bucketName);
            const fileName = `products/${Date.now()}_${productData.file.originalname}`;
            const file = bucket.file(fileName);

            await new Promise((resolve, reject) => {
                const blobStream = file.createWriteStream({
                    metadata: { contentType: productData.file.mimetype }
                });
                blobStream.on('error', reject);
                blobStream.on('finish', resolve);
                blobStream.end(productData.file.buffer);
            });

            // Make the file publicly accessible
            await file.makePublic();
            const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

            // Store product details with image URL to database
            productData.body.image = publicUrl  // Attach public URL for product image
            if (productData.body.tax) {
                productData.body.tax_value = parseFloat(productData.body.price*(productData.body.tax/100)).toFixed(2)  // Attach public URL for product image
            } else {
                productData.body.tax_value=0
            }

            const response = await product_controller.createProduct(productData.body);
            return successResponse(response);
        }
    } catch (error) {
        console.log("Error in create  products..", error);
        return errorResponse("Error in create products..");
    }
};

// UPDATE PRODUCT
const updateProduct = async (productData) => {
    try {
        const token = productData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token");
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData);
        }
        if (decodedData.role == "admin") {
            const existingProduct = await product_controller.getProductById(productData.body.id);
            if (!existingProduct) {
                return errorResponse("Product not found");
            }
            // Check if a new image file is provided
            let imageUrl;
            if (productData.file) {
                const bucket = storage.bucket(bucketName);

                // If the product has an existing image, delete it to save storage
                if (existingProduct.image) {
                    const oldFileName = existingProduct.image.split(`${bucketName}/`)[1];
                    const oldFile = bucket.file(oldFileName);
                    await oldFile.delete().catch((err) => {
                        console.log("Error deleting old image:", err);
                    });
                }

                // Upload new image to Google Cloud Storage
                const newFileName = `products/${Date.now()}_${productData.file.originalname}`;
                const newFile = bucket.file(newFileName);

                await new Promise((resolve, reject) => {
                    const blobStream = newFile.createWriteStream({
                        metadata: { contentType: productData.file.mimetype }
                    });
                    blobStream.on('error', reject);
                    blobStream.on('finish', resolve);
                    blobStream.end(productData.file.buffer);
                });

                // Make the new image publicly accessible
                await newFile.makePublic();
                imageUrl = `https://storage.googleapis.com/${bucketName}/${newFileName}`;
            }

            // Update product details with the new image URL if applicable
            productData.body.image = imageUrl || existingProduct.image  // New URL if provided; otherwise keep old image URL
            if (productData.body.tax) {
                productData.body.tax_value = parseFloat(productData.body.price*(productData.body.tax/100)).toFixed(2)  // Attach public URL for product image
            } 
            const updatedData = await product_controller.updateProduct(productData.body.id, productData.body);
            return successResponse(updatedData);
        }
        return errorResponse("access denied....!");
    } catch (error) {
        console.log("Error in update Product in services.....!", error);
        return errorResponse("Error in update Product in services");
    }
};

// DELETE PRODUCT
const deleteProduct = async (productData) => {
    try {
        const token = productData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token");
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData);
        }
        if (decodedData.role == "admin") {
            const deleteData = { status: 'inactive' }
            const deletedData = await product_controller.deleteProduct(productData.body.id, deleteData);
            return successResponse(deletedData);
        }
        return errorResponse("access denied...!");
    } catch (error) {
        console.log("Error in delete Product in services.....!", error);
        return errorResponse("Error in delete Product in services");
    }
};

// GET PRODUCT BY ID

const getProductById = async (productData) => {
    try {
        const token = productData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token");
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData);
        }

        if (decodedData.role === "admin" || decodedData.role === "user" || decodedData.role === "deliveryPartner") {
            const response = await product_controller.getProductById(productData.body.id);
            return successResponse(response);
        }

    } catch (error) {
        console.log("Error in get by id Product in services.....!", error);
        return errorResponse("Error in get by id Product in services");
    }
};

// GET ALL PRODUCTS

const getAllProduct = async (productData) => {
    try {
        const token = productData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token");
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData);
        }
        if (decodedData.role === "admin" || decodedData.role === "user" || decodedData.role === "deliveryPartner") {
            const response = await product_controller.getAllProduct(productData.body);
            return successResponse(response);
        }
    } catch (error) {
        console.log("Error in get all Product in services.....!", error);
        return errorResponse("Error in get all Product in services");
    }
};

// SEARCH PRODUCT DETAILS

const searchProductDetails = async (productData) => {
    try {
        const token = productData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token");
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData);
        }
        if (decodedData.role === "admin" || decodedData.role === "user" || decodedData.role === "deliveryPartner") {
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
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getAllProduct,
    searchProductDetails,
    // bulkProductUpload,
}
