const { sequelize } = require('../../db')
const userRemoveRequestModel = require('../../model/userRemoveRequest')(sequelize)
const { errorResponse } = require('../service/response');


// CREATE userRemoveRequest

const createUserRemoveRequest = async (userRemoveRequestData) => {
    try {
        const newUserRemoveRequest = await userRemoveRequestModel.create(userRemoveRequestData);
        return newUserRemoveRequest;
    }
    catch (error) {
        console.error("Error in createUserRemoveRequest details in controller", error);
        throw new Error("Error in createUserRemoveRequest in controller");
    }
};


// UPDATE userRemoveRequestS

const updateUserRemoveRequest = async (user_id, userRemoveRequestData) => {
    try {
        const newUserRemoveRequest = await userRemoveRequestModel.update(userRemoveRequestData, {
            where: {
                id: user_id
            }
        });
        return newUserRemoveRequest;
    }
    catch (error) {
        console.error("Error in update userRemoveRequest in controller", error);
        throw new Error("Error update userRemoveRequest");
    }
};


// GET ALL userRemoveRequest

const getAllUserRemoveRequest = async () => {
    try {

        const userRemoveRequest = await userRemoveRequestModel.findAll();
        return userRemoveRequest
    }
    catch (error) {
        console.log("error in get userRemoveRequest in controller..!", error);
        throw new Error('enable to create userRemoveRequest error')
    }
}

module.exports = {
    createUserRemoveRequest,
    updateUserRemoveRequest,
    getAllUserRemoveRequest,
}