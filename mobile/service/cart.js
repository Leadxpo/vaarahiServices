const cart_controller = require("../controller/cart");
const user_controller = require("../controller/users");
const { verifyUser } = require("./userVerfication")
const { successResponse, errorResponse } = require("./response");
// const csv = require('csv-parser');
// const fs = require('file-system');

// CREATE PRODUCT
const createCart = async (cartData) => {
    try {
        const userVerifyStatus = await verifyUser(cartData.body.userID)
        if (userVerifyStatus) {
            const response = await cart_controller.createCart(cartData.body);
            
            return successResponse(response);
        }
    } catch (error) {
        console.log("Error in create  carts..", error);
        return errorResponse("Error in create carts..");
    }
};


// UPDATE PRODUCT
const updateCart = async (cartData) => {
    try {
        const userVerifyStatus = await verifyUser(cartData.body.userID)
        var updatedData={}
        if (userVerifyStatus) {
            const cartItemData= await cart_controller.getCartByproductID(cartData.body.id);
           const qtyCount=cartItemData.qty+cartData.body.qty

            if (qtyCount <=0) {
                updatedData = await cart_controller.deleteCartByproductID(cartData.body.id);
            } else {
                cartData.body.qty=qtyCount;
                 updatedData = await cart_controller.updateCartByProductID(cartData.body.id, cartData.body);
            }
            return successResponse(updatedData);
        }
        return errorResponse("access denied....!");
    } catch (error) {
        console.log("Error in update Cart in services.....!", error);
        return errorResponse("Error in update Cart in services");
    }
};

const updateCartByProductID = async (cartData) => {
    try {
        const userVerifyStatus = await verifyUser(cartData.body.userID)
        var updatedData={}
        if (userVerifyStatus) {
            const cartItemData= await cart_controller.getCartByproductID(cartData.body.product_id,cartData.body.userID);
           const qtyCount=cartItemData.qty+cartData.body.qty

            if (qtyCount <=0) {
                updatedData = await cart_controller.deleteCartByproductID(cartData.body.product_id,cartData.body.userID);
            } else {
                cartData.body.qty=qtyCount;
                 updatedData = await cart_controller.updateCartByProductID(cartData.body.userID,cartData.body.product_id, cartData.body);
            }
            return successResponse(updatedData);
        }
        return errorResponse("access denied....!");
    } catch (error) {
        console.log("Error in update Cart in services.....!", error);
        return errorResponse("Error in update Cart in services");
    }
};

// GET PRODUCT BY ID

const getCartById = async (cartData) => {
    try {
        const userVerifyStatus = await verifyUser(cartData.body.userID)
        if (userVerifyStatus) {
            const response = await cart_controller.getCartById(cartData.body.id);
            return successResponse(response);
        }

    } catch (error) {
        console.log("Error in get by id Cart in services.....!", error);
        return errorResponse("Error in get by id Cart in services");
    }
};

// GET ALL PRODUCTS

const getCartByUserID = async (cartData) => {
    try {
        const userVerifyStatus = await verifyUser(cartData.body.userID)
        if (userVerifyStatus) {
            const response = await cart_controller.getCartByUserID(cartData.body.userID);
            return successResponse(response);
        }
    } catch (error) {
        console.log("Error in get all Cart in services.....!", error);
        return errorResponse("Error in get all Cart in services");
    }
};

// SEARCH PRODUCT DETAILS

const searchCartDetails = async (cartData) => {
    try {
        const userVerifyStatus = await verifyUser(cartData.body.userID)
        if (userVerifyStatus) {
            const Response = await cart_controller.searchCartDetails(cartData.body);
            return successResponse(Response);
        }
        return errorResponse("access denied...!");
    } catch (error) {
        console.log("Error in search Cart in services.....!", error);
        return errorResponse("Error in search Cart in services");
    }
};

// DELETE PRODUCT
const deleteCart = async (cartData) => {
    try {
        const userVerifyStatus = await verifyUser(cartData.body.userID)
        if (userVerifyStatus) {
            const deletedData = await cart_controller.deleteCarts(cartData.body.userID);
            
            return successResponse(deletedData);
    }else{
        return errorResponse("access denied...!");
    }
    } catch (error) {
        console.log("Error in delete Cart in services.....!", error);
        return errorResponse("Error in delete Cart in services");
    }
};



module.exports = {
    createCart,
    updateCart,
    updateCartByProductID,
    getCartById,
    getCartByUserID,
    searchCartDetails,
    deleteCart
}
