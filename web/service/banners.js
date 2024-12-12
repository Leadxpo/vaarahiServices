const banner_controller = require("../controller/banners");
const shortUUID = require('short-uuid');
const {  verifyToken } = require("../service/jwttoken")
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

const createBanner = async (bannerData) => {
    try {
        const token = bannerData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        } 
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role == "admin") {
            if (!bannerData.file) {
                return errorResponse("No file uploaded."); 
            }

            const bucket = storage.bucket(bucketName);
            const fileName = `banner/${Date.now()}_${bannerData.file.originalname}`;
            const file = bucket.file(fileName);

            await new Promise((resolve, reject) => {
                const blobStream = file.createWriteStream({
                    metadata: { contentType: bannerData.file.mimetype }
                });
                blobStream.on('error', reject);
                blobStream.on('finish', resolve);
                blobStream.end(bannerData.file.buffer);
            });

            // Make the file publicly accessible
            await file.makePublic();
            const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

            // Store product details with image URL to database
                bannerData.body.image= publicUrl  // Attach public URL for product image

            const response = await banner_controller.createBanner(bannerData.body);
            return successResponse(response);
        }else{
            return errorResponse("access Denain........")
        }
    }
    catch (error) {
        console.log("Error in create Banner in services..", error)
        return errorResponse("Error in create Banner in services..")
    }
}

// UPDATE BANNER

const updateBanner = async (bannerData) => {
    try {
        const token = bannerData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role == "admin") {

            if (bannerData.file) {
                const getUserDate = await banner_controller.getBannerById(bannerData.body.id)

                if (getUserDate.image !== null) {
                    await deleteImage(getUserDate.image)
                    bannerData.body.image = bannerData.file.filename
                }
                else {
                    bannerData.body.image = bannerData.file.filename
                }
            }
            const updatedData = await banner_controller.updateBanner(bannerData.body.id, bannerData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update Banner in servicess.....!", error)
        return errorResponse("Error in update Banner in servicess")
    }
};

// DELETE BANNER

const deleteBanner = async (bannerData) => {
    try {
        const token = bannerData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }

        if (decodedData.role == "admin") {
            const deletedData = await banner_controller.deleteBanner(bannerData.body.id)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete Banner in  servicess.....!", error)
        return errorResponse("Error in delete Banner in servicess")
    }
};

// DELETE BANNER BY BANNER NAME

const getBannerByName = async (bannerData) => {
    try {
        const token = bannerData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }

        if (decodedData.role==="admin" || decodedData.role==="user" || decodedData.role==="deliveryPartner") {
            const deletedData = await banner_controller.getBannerByName(bannerData.body.title)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete Banner in  servicess.....!", error)
        return errorResponse("Error in delete Banner in servicess")
    }
};

// GET BANNER BY ID

const getBannerById = async (bannerData) => {
    try {
        const token = bannerData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role==="admin" || decodedData.role==="user" || decodedData.role==="deliveryPartner") {
            const response = await banner_controller.getBannerById(bannerData.body.id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id Banner in  servicess.....!", error)
        return errorResponse("Error in get by id Banner in servicess")
    }
};

// GET ALL BANNERS
const getAllBanners = async (bannerData) => {
    try {
        const token = bannerData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role==="admin" || decodedData.role==="user" || decodedData.role==="deliveryPartner") {
            const response = await banner_controller.getAllBanners()
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id Banner in  servicess.....!", error)
        return errorResponse("Error in get by id Banner in servicess")
    }
};

module.exports = {
    createBanner,
    updateBanner,
    deleteBanner,
    getBannerByName,
    getBannerById,
    getAllBanners
}