const coupon_controller = require("../controller/coupons");
const shortUUID = require('short-uuid');
const { verifyToken } = require("../service/jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")
const { Storage } = require('@google-cloud/storage');
require('dotenv').config({ path: '../../.env' }); // Path to .env from couponService.js

// Google Cloud Storage configuration
const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_KEY_FILE
});
const bucketName = process.env.GCLOUD_BUCKET_NAME;

// CREATE PRODUCT

const createCoupon = async (couponData) => {
    try {
        const token = couponData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
            if (!couponData.file) {
                return errorResponse("No file uploaded.");
            }

            const bucket = storage.bucket(bucketName);
            const fileName = `coupons/${Date.now()}_${couponData.file.originalname}`;
            const file = bucket.file(fileName);

            await new Promise((resolve, reject) => {
                const blobStream = file.createWriteStream({
                    metadata: { contentType: couponData.file.mimetype }
                });
                blobStream.on('error', reject);
                blobStream.on('finish', resolve);
                blobStream.end(couponData.file.buffer);
            });

            // Make the file publicly accessible
            await file.makePublic();
            const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

            // Store coupon details with image URL to database
            couponData.body.image = publicUrl  // Attach public URL for coupon image

            const response = await coupon_controller.createCoupon(couponData.body);
            return successResponse(response);
        }
    }
    catch (error) {
        console.log("Error in create coupon in services..", error)
        return errorResponse("Error in coupon cart in services..")
    }
}

// UPDATE PRODUCT

const updateCoupon = async (couponData) => {
    try {
        const token = couponData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role == "admin") {
            const existingCoupon = await coupon_controller.getCouponById(couponData.body.id)
            if (!existingCoupon) {
                return errorResponse("Coupon not found");
            }
            // Check if a new image file is provided
            let imageUrl;
            if (couponData.file) {
                const bucket = storage.bucket(bucketName);

                // If the coupon has an existing image, delete it to save storage
                if (existingCoupon.image) {
                    const oldFileName = existingCoupon.image.split(`${bucketName}/`)[1];
                    const oldFile = bucket.file(oldFileName);
                    await oldFile.delete().catch((err) => {
                        console.log("Error deleting old image:", err);
                    });
                }

                // Upload new image to Google Cloud Storage
                const newFileName = `coupons/${Date.now()}_${couponData.file.originalname}`;
                const newFile = bucket.file(newFileName);

                await new Promise((resolve, reject) => {
                    const blobStream = newFile.createWriteStream({
                        metadata: { contentType: couponData.file.mimetype }
                    });
                    blobStream.on('error', reject);
                    blobStream.on('finish', resolve);
                    blobStream.end(couponData.file.buffer);
                });

                // Make the new image publicly accessible
                await newFile.makePublic();
                imageUrl = `https://storage.googleapis.com/${bucketName}/${newFileName}`;
            }

            // Update coupon details with the new image URL if applicable
            couponData.body.image = imageUrl || existingCoupon.image  // New URL if provided; otherwise keep old image URL
            const updatedData = await coupon_controller.updateCoupon(couponData.body.id, couponData.body);
            return successResponse(updatedData);
        }
    return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update coupon in servicess.....!", error)
        return errorResponse("Error in update coupon in servicess")
    }
};

// DELETE PRODUCT

const deleteCoupon = async (couponData) => {
    try {
        const token = couponData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }

        if (decodedData.role == "admin") {
            const deletedData = await coupon_controller.deleteCoupon(couponData.body.id)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete coupon in  servicess.....!", error)
        return errorResponse("Error in delete coupon in servicess")
    }
};

// GET PRODUCT BY ID

const getCouponById = async (couponData) => {
    try {
        const token = couponData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
            const response = await coupon_controller.getCouponById(couponData.body.id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id coupon in  servicess.....!", error)
        return errorResponse("Error in get by id coupon in servicess")
    }
};

// GET ALL PRODUCT

const getAllCoupon = async (couponData) => {
    try {
        const token = couponData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
            const response = await coupon_controller.getAllCoupon(couponData.body)
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all coupon in servicess.....!", error)
        return errorResponse("Error in get all coupon in servicess")
    }
};

// SEARCH PRODUCT DETAILS

const searchCouponDetails = async (couponData) => {
    try {
        const token = couponData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
            const Response = await coupon_controller.searchCouponDetails(couponData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search coupon in  servicess.....!", error)
        return errorResponse("Error in search coupon in  servicess")
    }
};


module.exports = {
    createCoupon,
    updateCoupon,
    deleteCoupon,
    getCouponById,
    getAllCoupon,
    searchCouponDetails


}