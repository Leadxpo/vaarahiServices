const fs = require("fs").promises; // Use the promise-based API for fs
const path = require("path");
const { errorResponse, successResponse } = require("./response");

const deleteImage = async (imagePath) => {
    try {
        const fullPath = path.join(__dirname, '../../storage', 'images', imagePath);
        await fs.unlink(fullPath);
        console.log("Successfully deleted");
        return successResponse("Successfully deleted");
    } catch (error) {
        console.error("Error deleting image:", error);
        return errorResponse("Failed to delete image");
    }
};

module.exports = {
    deleteImage
};
