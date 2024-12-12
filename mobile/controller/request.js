const { sequelize } = require('../../db')
const requestModel = require('../../model/request')(sequelize)
const { Op, where } = require("sequelize");
const { errorResponse } = require('../service/response');


// CREATE request

const createrequest = async (requestData) => {
    try {
        const newrequest = await requestModel.create(requestData);
        return newrequest;
    }
    catch (error) {
        console.error("Error in create request details in controller", error);
        throw new Error("Error in create request in controller");
    }
};

// UPDATE request

const updaterequest = async (request_id, requestData) => {
    try {
        const newrequest = await requestModel.update(requestData, {
            where: {
                id: request_id
            }
        });
        return newrequest;
    }
    catch (error) {
        console.error("Error in update request in controller", error);
        throw new Error("Error update request in controller");
    }
};

// DELETE request

const deleterequest = async (request_id) => {
    try {
        const newrequest = await requestModel.destroy({
            where: {
                id: request_id
            }
        });
        return newrequest;
    }
    catch (error) {
        console.error("Error in delete request in controller", error);
        throw new Error("Error delete request in controller");
    }
};

// GET request

const getrequestById = async (request_id) => {
    try {
        const request = await requestModel.findOne({
            where: {
                id: request_id
            }
        })
        return request
    }
    catch (error) {
        console.log("error in get request in controller..!", error);
        throw new Error('enable to create request error')
    }
};

const getAllrequestsByStaffID = async (staffID) => {
    try {
        const request = await requestModel.findAll({
            where: {
                staff_id: staffID
            }
        })
        return request
    }
    catch (error) {
        console.log("error in get request in controller..!", error);
        throw new Error('enable to create request error')
    }
};

const getPendingRequestsByStaffID = async (staffID) => {
    try {
        const request = await requestModel.findAll({
            where: {
                staff_id: staffID,
                status: {
                    [Op.ne]: 'accepted'
                }
            }
        })
        return request
    }
    catch (error) {
        console.log("error in get request in controller..!", error);
        throw new Error('enable to create request error')
    }
};

module.exports = {
    createrequest,
    updaterequest,
    deleterequest,
    getrequestById,
    getPendingRequestsByStaffID,
    getAllrequestsByStaffID
}