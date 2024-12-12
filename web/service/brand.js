const brands_controller = require("../controller/brand");
const {  verifyToken } = require("../service/jwttoken")
const { successResponse, errorResponse } = require("./response")
const shortUUID = require('short-uuid');
const { Storage } = require('@google-cloud/storage');
require('dotenv').config({ path: '../../.env' }); // Path to .env from brandService.js

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_KEY_FILE
});
const bucketName = process.env.GCLOUD_BUCKET_NAME;

// CREATE Brands

const createBrands = async (brandData) => {
    try {
        const translator = shortUUID();
        const brand_id = translator.new();
        brandData.body.brand_id = brand_id;

        const token = brandData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
            if (!brandData.file) {
                return errorResponse("No file uploaded."); 
            }

            const bucket = storage.bucket(bucketName);
            const fileName = `brands/${Date.now()}_${brandData.file.originalname}`;
            const file = bucket.file(fileName);

            await new Promise((resolve, reject) => {
                const blobStream = file.createWriteStream({
                    metadata: { contentType: brandData.file.mimetype }
                });
                blobStream.on('error', reject);
                blobStream.on('finish', resolve);
                blobStream.end(brandData.file.buffer);
            });

            // Make the file publicly accessible
            await file.makePublic();
            const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

            // Store category details with image URL to database
            brandData.body.image= publicUrl  // Attach public URL for category image

            const response = await brands_controller.createBrands(brandData.body);
            return successResponse(response);
        } else {
            return errorResponse("access denaied")
        }
    }
    catch (error) {
        console.log("Error in create cart in services..", error)
        return errorResponse("Error in create cart in services..")
    }
}

// CATEGORY UPDATE

const updateBrands = async (brandData) => {
    try {
        const token = brandData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role == "admin") {
            const existingBrand = await brands_controller.getBrandsById(brandData.body.brand_id);
            if (!existingBrand) {
                return errorResponse("Brand not found");
            }
            // Check if a new image file is provided
            let imageUrl;
            if (brandData.file) {
                const bucket = storage.bucket(bucketName);

                // If the brand has an existing image, delete it to save storage
                if (existingBrand.image) {
                    const oldFileName = existingBrand.image.split(`${bucketName}/`)[1];
                    const oldFile = bucket.file(oldFileName);
                    await oldFile.delete().catch((err) => {
                        console.log("Error deleting old image:", err);
                    });
                }

                // Upload new image to Google Cloud Storage
                const newFileName = `brands/${Date.now()}_${brandData.file.originalname}`;
                const newFile = bucket.file(newFileName);

                await new Promise((resolve, reject) => {
                    const blobStream = newFile.createWriteStream({
                        metadata: { contentType: brandData.file.mimetype }
                    });
                    blobStream.on('error', reject);
                    blobStream.on('finish', resolve);
                    blobStream.end(brandData.file.buffer);
                });

                // Make the new image publicly accessible
                await newFile.makePublic();
                imageUrl = `https://storage.googleapis.com/${bucketName}/${newFileName}`;
            }

            // Update brand details with the new image URL if applicable
            brandData.body.image = imageUrl || existingBrand.image  // New URL if provided; otherwise keep old image URL
            const updatedData = await brands_controller.updateBrands(brandData.body.brand_id, brandData.body);
            return successResponse(updatedData);
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update brands in servicess.....!", error)
        return errorResponse("Error in update brands in servicess")
    }
};

// DELETE  Brands

const deleteBrands = async (brandData) => {
    try {
        const token = brandData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role == "admin") {
            const deletedData = await brands_controller.deleteBrands(brandData.body.brand_id)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete brands in  servicess.....!", error)
        return errorResponse("Error in delete brands in servicess")
    }
};

// GET  Brands BY ID

const getBrandsById = async (brandData) => {
    try {
        const token = brandData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role==="admin" || decodedData.role==="user" || decodedData.role==="deliveryPartner") {
            const response = await brands_controller.getBrandsById(brandData.body.brand_id)
            return successResponse(response)
        }
            return errorResponse("access Denain........")

    } catch (error) {
        console.log("Error in get by id brands in  servicess.....!", error)
        return errorResponse("Error in get by id brands in servicess")
    }
};

// GET ALL  Brands

const getAllBrands = async (brandData) => {
    try {
        const token = brandData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role==="admin" || decodedData.role==="user" || decodedData.role==="deliveryPartner") {
            const response = await brands_controller.getAllBrands()
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all brands in servicess.....!", error)
        return errorResponse("Error in get all brands in servicess")
    }
};

// SEARCH  Brands DETAILS

const searchBrandsDetails = async (brandData) => {
    try {
        const token = brandData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role==="admin" || decodedData.role==="user" || decodedData.role==="deliveryPartner") {
            const Response = await brands_controller.searchBrandsDetails(brandData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search brands in  servicess.....!", error)
        return errorResponse("Error in search brands in  servicess")
    }
};


module.exports = {
    createBrands,
    updateBrands,
    deleteBrands,
    getBrandsById,
    getAllBrands,
    searchBrandsDetails,

}