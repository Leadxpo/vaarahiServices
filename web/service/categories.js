const categories_controller = require("../controller/categories");
const {  verifyToken } = require("../service/jwttoken")
const { successResponse, errorResponse } = require("./response")
const shortUUID = require('short-uuid');
const { Storage } = require('@google-cloud/storage');
require('dotenv').config({ path: '../../.env' }); // Path to .env from categoryService.js

// Google Cloud Storage configuration
const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_KEY_FILE
});
const bucketName = process.env.GCLOUD_BUCKET_NAME;

// CREATE CATEGORIES

const createCategories = async (categoryData) => {
    try {
        const translator = shortUUID();
        const category_id = translator.new();
        categoryData.body.category_id = category_id;

        const token = categoryData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {

            if (!categoryData.file) {
                return errorResponse("No file uploaded."); 
            }

            const bucket = storage.bucket(bucketName);
            const fileName = `categories/${Date.now()}_${categoryData.file.originalname}`;
            const file = bucket.file(fileName);

            await new Promise((resolve, reject) => {
                const blobStream = file.createWriteStream({
                    metadata: { contentType: categoryData.file.mimetype }
                });
                blobStream.on('error', reject);
                blobStream.on('finish', resolve);
                blobStream.end(categoryData.file.buffer);
            });

            // Make the file publicly accessible
            await file.makePublic();
            const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

            // Store category details with image URL to database
                categoryData.body.image= publicUrl  // Attach public URL for category image

            const response = await categories_controller.createCategories(categoryData.body);
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

const updateCategories = async (categoryData) => {
    try { 
        const token = categoryData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role == "admin") {
            const existingCategories = await categories_controller.getCategoriesById(categoryData.body.category_id);
            if (!existingCategories) {
                return errorResponse("Categories not found");
            }
            // Check if a new image file is provided
            let imageUrl;
            if (categoryData.file) {
                const bucket = storage.bucket(bucketName);

                // If the category has an existing image, delete it to save storage
                if (existingCategories.image) {
                    const oldFileName = existingCategories.image.split(`${bucketName}/`)[1];
                    const oldFile = bucket.file(oldFileName);
                    await oldFile.delete().catch((err) => {
                        console.log("Error deleting old image:", err);
                    });
                }

                // Upload new image to Google Cloud Storage
                const newFileName = `categories/${Date.now()}_${categoryData.file.originalname}`;
                const newFile = bucket.file(newFileName);

                await new Promise((resolve, reject) => {
                    const blobStream = newFile.createWriteStream({
                        metadata: { contentType: categoryData.file.mimetype }
                    });
                    blobStream.on('error', reject);
                    blobStream.on('finish', resolve);
                    blobStream.end(categoryData.file.buffer);
                });

                // Make the new image publicly accessible
                await newFile.makePublic();
                imageUrl = `https://storage.googleapis.com/${bucketName}/${newFileName}`;
            }

            // Update category details with the new image URL if applicable
            categoryData.body.image = imageUrl || existingCategories.image  // New URL if provided; otherwise keep old image URL
            const updatedData = await categories_controller.updateCategories(categoryData.body.category_id, categoryData.body);
            return successResponse(updatedData);
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update categories in servicess.....!", error)
        return errorResponse("Error in update categories in servicess")
    }
};

// DELETE  CATEGORIES

const deleteCategories = async (categoryData) => {
    try {
        const token = categoryData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role == "admin") {
            const deletedData = await categories_controller.deleteCategories(categoryData.body.category_id)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete categories in  servicess.....!", error)
        return errorResponse("Error in delete categories in servicess")
    }
};

// GET  CATEGORIES BY ID

const getCategoriesById = async (categoryData) => {
    try {
        const token = categoryData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role==="admin" || decodedData.role==="user" || decodedData.role==="deliveryPartner") {
            const response = await categories_controller.getCategoriesById(categoryData.body.category_id)
            return successResponse(response)
        }
            return errorResponse("access Denain........")

    } catch (error) {
        console.log("Error in get by id categories in  servicess.....!", error)
        return errorResponse("Error in get by id categories in servicess")
    }
};

// GET ALL  CATEGORIES

const getAllCategories = async (categoryData) => {
    try {
        const token = categoryData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role==="admin" || decodedData.role==="user" || decodedData.role==="deliveryPartner") {
            const response = await categories_controller.getAllCategories()
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all categories in servicess.....!", error)
        return errorResponse("Error in get all categories in servicess")
    }
};

// SEARCH  CATEGORIES DETAILS

const searchCategoriesDetails = async (categoryData) => {
    try {
        const token = categoryData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role==="admin" || decodedData.role==="user" || decodedData.role==="deliveryPartner") {
            const Response = await categories_controller.searchCategoriesDetails(categoryData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search categories in  servicess.....!", error)
        return errorResponse("Error in search categories in  servicess")
    }
};


module.exports = {
    createCategories,
    updateCategories,
    deleteCategories,
    getCategoriesById,
    getAllCategories,
    searchCategoriesDetails,

}