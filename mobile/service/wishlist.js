const wishlist_controller = require("../controller/wishlist");
const user_controller = require("../controller/users");
const categories_controller = require("../controller/categories");
;
const { verifyUser } = require("./userVerfication")
const { successResponse, errorResponse } = require("./response");
const { Json } = require("sequelize/lib/utils");
// const csv = require('csv-parser');
// const fs = require('file-system');

// CREATE WHISHLIST
const createWishlist = async (wishlistData) => {
    try {
        const userVerifyStatus = await verifyUser(wishlistData.body.userID)
        if (userVerifyStatus) {
            const userData = await user_controller.getUserById(wishlistData.body.userID)
            // Add the new wishlist ID to the user's wishlist
            userData.wishList.push(wishlistData.body.wishlistID);

            // Assuming the user model is updated with the new wishlist
            const response = await user_controller.updateWishlist(wishlistData.body.userID, userData.wishList);
            return successResponse(response);
        }
    } catch (error) {
        console.log("Error in create  wishlists..", error);
        return errorResponse("Error in create wishlists..");
    }
};


// UPDATE WHISHLIST
const updateWishlist = async (wishlistData) => {
    try {
        const userVerifyStatus = await verifyUser(wishlistData.body.userID)
        if (userVerifyStatus) {
            const updatedData = await wishlist_controller.updateWishlist(wishlistData.body.id, wishlistData.body);
            return successResponse(updatedData);
        }
        return errorResponse("access denied....!");
    } catch (error) {
        console.log("Error in update Wishlist in services.....!", error);
        return errorResponse("Error in update Wishlist in services");
    }
};

// GET WHISHLIST BY ID

const getWishlistById = async (wishlistData) => {
    try {
        const userVerifyStatus = await verifyUser(wishlistData.body.userID)
        if (userVerifyStatus) {
            const response = await wishlist_controller.getWishlistById(wishlistData.body.id);
            return successResponse(response);
        }

    } catch (error) {
        console.log("Error in get by id Wishlist in services.....!", error);
        return errorResponse("Error in get by id Wishlist in services");
    }
};

// GET ALL WHISHLISTS

const getWishlistByUserID = async (wishlistData) => {
    try {
        const userVerifyStatus = await verifyUser(wishlistData.body.userID)
        if (userVerifyStatus) {
            const response = await wishlist_controller.getWishlistByUserID(wishlistData.body.userID);
            return successResponse(response);
        }
    } catch (error) {
        console.log("Error in get all Wishlist in services.....!", error);
        return errorResponse("Error in get all Wishlist in services");
    }
};

// SEARCH WHISHLIST DETAILS

const searchWishlistDetails = async (wishlistData) => {
    try {
        const userVerifyStatus = await verifyUser(wishlistData.body.userID)
        if (userVerifyStatus) {
            const Response = await wishlist_controller.searchWishlistDetails(wishlistData.body);
            return successResponse(Response);
        }
        return errorResponse("access denied...!");
    } catch (error) {
        console.log("Error in search Wishlist in services.....!", error);
        return errorResponse("Error in search Wishlist in services");
    }
};

// DELETE PRODUCT
const deleteWishlist = async (wishlistData) => {
    try {
        // Verify the user using the provided userID
        const userVerifyStatus = await verifyUser(wishlistData.body.userID);
        
        if (userVerifyStatus) {
            // Get user data by ID
            const userData = await user_controller.getUserById(wishlistData.body.userID);

            // Find the index of the wishlist ID to delete
            const index = userData.wishList.indexOf(wishlistData.body.wishlistID);
            
            // Check if the ID exists in the wishlist
            if (index !== -1) {
                // Remove the ID from the wishlist
                userData.wishList.splice(index, 1);
                
                // Update the user's wishlist in the database
                const response = await user_controller.updateWishlist(wishlistData.body.userID, userData.wishList);
                
                // Return a success response
                return successResponse(response);
            } else {
                // Return a response if the ID was not found
                return errorResponse("Wishlist ID not found.");
            }
        } else {
            return errorResponse("User verification failed.");
        }
    } catch (error) {
        console.log("Error in deleting wishlist:", error);
        return errorResponse("Error in deleting wishlist.");
    }
};

module.exports = {
    createWishlist,
    updateWishlist,
    getWishlistById,
    getWishlistByUserID,
    searchWishlistDetails,
    deleteWishlist
}
