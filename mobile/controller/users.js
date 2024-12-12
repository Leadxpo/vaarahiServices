const { sequelize } = require('../../db')
const userModel = require('../../model/users')(sequelize)
const { errorResponse } = require('../service/response');


// CREATE user

const createUser = async (userData) => {
    try {
        const newUser = await userModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in createUser details in controller", error);
        throw new Error("Error in createUser in controller");
    }
};


// UPDATE userS

const updateUser = async (user_id, userData) => {
    try {
        const newUser = await userModel.update(userData, {
            where: {
                id: user_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update user in controller", error);
        throw new Error("Error update user");
    }
};

const updateWishlist = async (user_id, wishListID) => {
    console.log("wishlistData : ",wishListID)
    try {
        const newUser = await userModel.update( { wishList:wishListID}, {
            where: {
                id: user_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update user in controller", error);
        throw new Error("Error update user");
    }
};

const updateCartlist = async (user_id, cartListID) => {
    console.log("cartListID : ",cartListID)
    try {
        const newUser = await userModel.update( { cartList:cartListID}, {
            where: {
                id: user_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update user in controller", error);
        throw new Error("Error update user");
    }
};


// UPDATE userS OTP

const updateUserOTP = async (userData) => {
    try {
        const newUser = await userModel.update(userData, {
            where: {
                phone_no: userData.phone_no
            }
        });

        return newUser;
    }
    catch (error) {
        console.error("Error in update user in controller", error);
        throw new Error("Error update user");
    }
};

const userLogin = async (phoneNo) => {
    try {
        const user = await userModel.findOne({
            where: {

                phone_no: phoneNo
            }
        });

        return user;
    }
    catch (error) {
        console.log("throw new error", error);
        throw new Error('enable to userLogin error')
    }
}


// GET user

const getUserById = async (user_id) => {
    try {
        const user = await userModel.findOne({
            where: {
                id: user_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get user in controller..!", error);
        throw new Error('enable to create user error')
    }
};



module.exports = {
    createUser,
    updateUser,
    updateWishlist,
    updateCartlist,
    userLogin,
    updateUserOTP,
    getUserById,
}