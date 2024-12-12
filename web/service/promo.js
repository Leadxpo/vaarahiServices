const promo_controller = require("../controller/promo");
const shortUUID = require('short-uuid');
const {  verifyToken } = require("./jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")
const { Storage } = require('@google-cloud/storage');
require('dotenv').config({ path: '../../.env' }); // Path to .env from productService.js

// Google Cloud Storage configuration
const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_KEY_FILE
});
const bucketName = process.env.GCLOUD_BUCKET_NAME;

// CREATE BANNER

const createPromo = async (promoData) => {
    try {
        const token = promoData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role == "admin") {
            if (!promoData.file) {
                return errorResponse("No file uploaded."); 
            }

            const bucket = storage.bucket(bucketName);
            const fileName = `coupons/${Date.now()}_${promoData.file.originalname}`;
            const file = bucket.file(fileName);

            await new Promise((resolve, reject) => {
                const blobStream = file.createWriteStream({
                    metadata: { contentType: promoData.file.mimetype }
                });
                blobStream.on('error', reject);
                blobStream.on('finish', resolve);
                blobStream.end(promoData.file.buffer);
            });

            // Make the file publicly accessible
            await file.makePublic();
            const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

            // Store product details with image URL to database
                promoData.body.image= publicUrl  // Attach public URL for product image
                
            const response = await promo_controller.createPromo(promoData.body);
            return successResponse(response);
        }else{
            return errorResponse("access Denain........")
        }
    }
    catch (error) {
        console.log("Error in create Promo in services..", error)
        return errorResponse("Error in create Promo in services..")
    }
}

// UPDATE BANNER

const updatePromo = async (promoData) => {
    try {
        const token = promoData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role == "admin") {

            if (promoData.file) {
                const getUserDate = await promo_controller.getPromoById(promoData.body.id)

                if (getUserDate.image !== null) {
                    await deleteImage(getUserDate.image)
                    promoData.body.image = promoData.file.filename
                }
                else {
                    promoData.body.image = promoData.file.filename
                }
            }
            const updatedData = await promo_controller.updatePromo(promoData.body.id, promoData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update Promo in servicess.....!", error)
        return errorResponse("Error in update Promo in servicess")
    }
};

// DELETE BANNER

const deletePromo = async (promoData) => {
    try {
        const token = promoData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }

        if (decodedData.role == "admin") {
            const deletedData = await promo_controller.deletePromo(promoData.body.id)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete Promo in  servicess.....!", error)
        return errorResponse("Error in delete Promo in servicess")
    }
};

// DELETE BANNER BY BANNER NAME

const getPromoByName = async (promoData) => {
    try {
        const token = promoData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }

        if (decodedData.role==="admin" || decodedData.role==="user" || decodedData.role==="deliveryPartner") {
            const deletedData = await promo_controller.getPromoByName(promoData.body.title)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete Promo in  servicess.....!", error)
        return errorResponse("Error in delete Promo in servicess")
    }
};

// GET BANNER BY ID

const getPromoById = async (promoData) => {
    try {
        const token = promoData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role==="admin" || decodedData.role==="user" || decodedData.role==="deliveryPartner") {
            const response = await promo_controller.getPromoById(promoData.body.id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id Promo in  servicess.....!", error)
        return errorResponse("Error in get by id Promo in servicess")
    }
};

// GET ALL BANNERS
const getAllPromos = async (promoData) => {
    try {
        const token = promoData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role==="admin" || decodedData.role==="user" || decodedData.role==="deliveryPartner") {
            const response = await promo_controller.getAllPromos()
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id Promo in  servicess.....!", error)
        return errorResponse("Error in get by id Promo in servicess")
    }
};

module.exports = {
    createPromo,
    updatePromo,
    deletePromo,
    getPromoByName,
    getPromoById,
    getAllPromos
}