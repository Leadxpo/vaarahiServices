const { sequelize } = require('../../db')
const addressModel = require('../../model/address')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../service/response');


// CREATE address

const createAddress = async (addressData) => {
    try {
        const newAddress = await addressModel.create(addressData);
        return newAddress;
    }
    catch (error) {
        console.error("Error in create address details in controller", error);
        throw new Error("Error in create address in controller");
    }
};

// UPDATE address

const updateAddress = async (address_id,  addressData) => {
    try {
        const newAddress = await addressModel.update(addressData, {
            where: {
                id: address_id
            }
        });
        return newAddress;
    }
    catch (error) {
        console.error("Error in update address in controller", error);
        throw new Error("Error update address in controller");
    }
};

// DELETE address

const deleteAddress = async (address_id) => {
    try {
        const newAddress = await addressModel.destroy({
            where: {
                id: address_id
            }
        });
        return newAddress;
    }
    catch (error) {
        console.error("Error in delete address in controller", error);
        throw new Error("Error delete address in controller");
    }
};

// GET address

const getAddressById = async (address_id) => {
    try {
        const address = await addressModel.findOne({
            where: {
                id: address_id
            }
        })
        return address
    }
    catch (error) {
        console.log("error in get address in controller..!", error);
        throw new Error('enable to create address error')
    }
};
const getAddressByUserId = async (user_id) => {
    try {
        const address = await addressModel.findAll({
            where: {
                user_id: user_id
            }
        })
        return address
    }
    catch (error) {
        console.log("error in get address in controller..!", error);
        throw new Error('enable to create address error')
    }
};

const getAllAddresss = async () => {
    try {
        const address = await addressModel.findAll()
        return address
    }
    catch (error) {
        console.log("error in get address in controller..!", error);
        throw new Error('enable to create address error')
    }
};

module.exports = {
    createAddress,
    updateAddress,
    deleteAddress,
    getAddressById,
    getAddressByUserId,
    getAllAddresss

}