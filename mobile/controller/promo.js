const { sequelize } = require('../../db')
const promoModel = require('../../model/promo')(sequelize)

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
    updatePromo,
    getPromoById,
    getAllPromos

}