const { sequelize } = require('../../db')
const promoModel = require('../../model/promo')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../service/response');


// CREATE promo

const createPromo = async (promoData) => {
    try {
        const newPromo = await promoModel.create(promoData);
        return newPromo;
    }
    catch (error) {
        console.error("Error in create promo details in controller", error);
        throw new Error("Error in create promo in controller");
    }
};

// UPDATE promo

const updatePromo = async (promo_id,  promoData) => {
    try {
        const newPromo = await promoModel.update(promoData, {
            where: {
                id: promo_id
            }
        });
        return newPromo;
    }
    catch (error) {
        console.error("Error in update promo in controller", error);
        throw new Error("Error update promo in controller");
    }
};

// DELETE promo

const deletePromo = async (promo_id) => {
    try {
        const newPromo = await promoModel.destroy({
            where: {
                id: promo_id
            }
        });
        return newPromo;
    }
    catch (error) {
        console.error("Error in delete promo in controller", error);
        throw new Error("Error delete promo in controller");
    }
};

// GET promo

const getPromoById = async (promo_id) => {
    try {
        const promo = await promoModel.findOne({
            where: {
                id: promo_id
            }
        })
        return promo
    }
    catch (error) {
        console.log("error in get promo in controller..!", error);
        throw new Error('enable to create promo error')
    }
};

const getAllPromos = async () => {
    try {
        const promo = await promoModel.findAll()
        return promo
    }
    catch (error) {
        console.log("error in get promo in controller..!", error);
        throw new Error('enable to create promo error')
    }
};

module.exports = {
    createPromo,
    updatePromo,
    deletePromo,
    getPromoById,
    getAllPromos

}