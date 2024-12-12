const { sequelize } = require('../../db')
const adminModel = require('../../model/adminStaff')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../service/response');


// CREATE admin

const createAdmin = async (adminData) => {
    try {
        const newAdmin = await adminModel.create(adminData);
        return newAdmin;
    }
    catch (error) {
        console.error("Error in createAdmin details in controller", error);
        throw new Error("Error in createAdmin in controller");
    }
};

// EMPLOYEE LOGIN

const adminLogin = async (phoneNo) => {
    try {
        const admin = await adminModel.findOne({
            where: {

                phone_no: phoneNo
            }
        });

        return admin;
    }
    catch (error) {
        console.log("throw new error", error);
        throw new Error('enable to adminLogin error')
    }
}


// UPDATE adminS

const updateAdmin = async (admin_id, adminData) => {
    try {
        const newAdmin = await adminModel.update(adminData, {
            where: {
                id: admin_id
            }
        });
        return newAdmin;
    }
    catch (error) {
        console.error("Error in update admin in controller", error);
        throw new Error("Error update admin");
    }
};

// DELETE EMPLOYEE

const deleteAdmin = async (admin_id) => {
    try {
        const newAdmin = await adminModel.destroy({
            where: {
                id: admin_id
            }
        });
        return newAdmin;
    }
    catch (error) {
        console.error("Error in delete admin in controller", error);
        throw new Error("Error delete admin");
    }
};

// GET admin

const getAdminById = async (admin_id) => {
    try {
        const admin = await adminModel.findOne({
            where: {
                id: admin_id
            }
        })
        return admin
    }
    catch (error) {
        console.log("error in get admin in controller..!", error);
        throw new Error('enable to create admin error')
    }
};

// GET ALL admin

const getAllAdmin = async () => {
    try {

        const admin = await adminModel.findAll({
            where: {
                name: {
                    [Op.ne]: 'admin' // Exclude clients where name is 'admin'
                }
            }
        });
        return admin
    }
    catch (error) {
        console.log("error in get admin in controller..!", error);
        throw new Error('enable to create admin error')
    }
}

const searchAdminDetails = async (adminData) => {
    try {

        const data = {};
        if (adminData.name) {
            data.name = adminData.name
        }

        if (adminData.id) {
            data.id = adminData.id
        }

        const admin = await adminModel.findAll({

            where: data

        });
        return admin


    } catch (error) {
        console.log("erorr in surch admin in controller", error)
        errorResponse("error in surch admin in controller")
    }
};

//  COUNT

const countAdminDetails = async () => {

    try {
        const newAdmin = await adminModel.count();
        return newAdmin;
    }
    catch (error) {
        console.error("Error in count admin in controller", error);
        throw new Error("Error count admin Details");
    }
}


module.exports = {
    createAdmin,
    adminLogin,
    updateAdmin,
    deleteAdmin,
    getAdminById,
    getAllAdmin,
    searchAdminDetails,
    countAdminDetails,
}