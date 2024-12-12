const { sequelize } = require('../../db')
const staffModel = require('../../model/deliveryStaff')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../service/response');


// CREATE staff

const createStaff = async (staffData) => {
    try {
        const newStaff = await staffModel.create(staffData);
        return newStaff;
    }
    catch (error) {
        console.error("Error in createStaff details in controller", error);
        throw new Error("Error in createStaff in controller");
    }
};

// EMPLOYEE LOGIN

const staffLogin = async (deliveryID) => {
    try {
        const staff = await staffModel.findOne({
            where: {

                staff_id: deliveryID
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

const updateStaff = async (ID, staffData) => {
    try {
        const newStaff = await staffModel.update(staffData, {
            where: {
                id: ID
            }
        });
        return newStaff;
    }
    catch (error) {
        console.error("Error in update staff in controller", error);
        throw new Error("Error update staff");
    }
};

// DELETE EMPLOYEE

const deleteStaff = async (deliveryID, deleteData) => {
    try {
        const newStaff = await staffModel.update(deleteData, {
            where: {
                staff_id: deliveryID
            }
        });
        return newStaff;
    }
    catch (error) {
        console.error("Error in delete staff in controller", error);
        throw new Error("Error delete staff");
    }
};

// GET staff

const getStaffById = async (staff_id) => {
    try {
        const staff = await staffModel.findOne({
            where: {
                id: staff_id
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

const searchStaffDetails = async (staffData) => {
    try {

        const data = {};
        if (staffData.name) {
            data.name = staffData.name
        }

        if (staffData.staff_id) {
            data.staff_id = staffData.staff_id
        }

        const staff = await staffModel.findAll({

            where: data

        });
        return staff


    } catch (error) {
        console.log("erorr in surch staff in controller", error)
        errorResponse("error in surch staff in controller")
    }
};

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
    createStaff,
    staffLogin,
    updateStaff,
    deleteStaff,
    getStaffById,
    getAllStaff,
    searchStaffDetails,
    countStaffDetails,
}