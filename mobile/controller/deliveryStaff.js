const { sequelize } = require('../../db')
const staffModel = require('../../model/deliveryStaff')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../service/response');

// EMPLOYEE LOGIN

const staffLogin = async (staffID) => {
    try {
        const staff = await staffModel.findOne({
            where: {

                staff_id: staffID
            }
        });

        return staff;
    }
    catch (error) {
        console.log("throw new error", error);
        throw new Error('enable to staffLogin error')
    }
}

// UPDATE staffS

const updateStaff = async (deliveryID, staffData) => {
    try {
        const newStaff = await staffModel.update(staffData, {
            where: {
                staff_id: deliveryID
            }
        });
        return newStaff;
    }
    catch (error) {
        console.error("Error in update staff in controller", error);
        throw new Error("Error update staff");
    }
};

// GET staff

const getStaffById = async (staffID) => {
    try {
        const staff = await staffModel.findOne({
            where: {
                staff_id: staffID
            }
        })
        return staff
    }
    catch (error) {
        console.log("error in get staff in controller..!", error);
        throw new Error('enable to create staff error')
    }
};

// GET ALL staff

const getAllStaff = async () => {
    try {

        const staff = await staffModel.findAll();
        return staff
    }
    catch (error) {
        console.log("error in get staff in controller..!", error);
        throw new Error('enable to create staff error')
    }
}
//  COUNT

const countStaffDetails = async () => {

    try {
        const newStaff = await staffModel.count();
        return newStaff;
    }
    catch (error) {
        console.error("Error in count staff in controller", error);
        throw new Error("Error count staff Details");
    }
}


module.exports = {
    staffLogin,
    updateStaff,
    getStaffById,
    getAllStaff,
    countStaffDetails,
}