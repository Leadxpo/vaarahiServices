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

const userLogin = async (phoneNo) => {
    try {
        const staff = await staffModel.findOne({
            where: {

                phone_no: phoneNo
            }
        });

        return staff;
    }
    catch (error) {
        console.log("throw new error", error);
        throw new Error('enable to staffLogin error')
    }
}


// DELETE EMPLOYEE

const deleteUser = async (user_id) => {
    try {
        const newUser = await userModel.destroy({
            where: {
                id: user_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete user in controller", error);
        throw new Error("Error delete user");
    }
};

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



// GET ALL user

const getAllUser = async () => {
    try {

        const user = await userModel.findAll();
        return user
    }
    catch (error) {
        console.log("error in get user in controller..!", error);
        throw new Error('enable to create user error')
    }
}

const searchUserDetails = async (userData) => {
    try {

        const data = {};
        if (userData.name) {
            data.name = userData.name
        }

        if (userData.id) {
            data.id = userData.id
        }

        if (userData.phone_no) {
            data.phone_no = userData.phone_no
        }
        if (userData.membershipID) {
            data.membershipID = userData.membershipID
        }

        const user = await userModel.findAll({

            where: data

        });
        return user


    } catch (error) {
        console.log("erorr in surch user in controller", error)
        errorResponse("error in surch user in controller")
    }
};

//  COUNT

const countUserDetails = async () => {

    try {
        const totalUser = await userModel.count();
        const totalRevenueResult = await userModel.sum('revenue');
        var counts = { users: totalUser, totalRevenue: totalRevenueResult || 0}
        return counts;
    }
    catch (error) {
        console.error("Error in count user in controller", error);
        throw new Error("Error count user Details");
    }
}


module.exports = {
    createUser,
    updateUser,
    userLogin,
    deleteUser,
    getUserById,
    getAllUser,
    searchUserDetails,
    countUserDetails,
}