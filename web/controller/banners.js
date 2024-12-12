const { sequelize } = require('../../db')
const bannerModel = require('../../model/banner')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../service/response');


// CREATE banner

const createBanner = async (bannerData) => {
    try {
        const newBanner = await bannerModel.create(bannerData);
        return newBanner;
    }
    catch (error) {
        console.error("Error in create banner details in controller", error);
        throw new Error("Error in create banner in controller");
    }
};

// UPDATE banner

const updateBanner = async (banner_id,  bannerData) => {
    try {
        const newBanner = await bannerModel.update(bannerData, {
            where: {
                id: banner_id
            }
        });
        return newBanner;
    }
    catch (error) {
        console.error("Error in update banner in controller", error);
        throw new Error("Error update banner in controller");
    }
};

// DELETE banner

const deleteBanner = async (banner_id) => {
    try {
        const newBanner = await bannerModel.destroy({
            where: {
                id: banner_id
            }
        });
        return newBanner;
    }
    catch (error) {
        console.error("Error in delete banner in controller", error);
        throw new Error("Error delete banner in controller");
    }
};

// GET banner

const getBannerById = async (banner_id) => {
    try {
        const banner = await bannerModel.findOne({
            where: {
                id: banner_id
            }
        })
        return banner
    }
    catch (error) {
        console.log("error in get banner in controller..!", error);
        throw new Error('enable to create banner error')
    }
};

const getAllBanners = async () => {
    try {
        const banner = await bannerModel.findAll()
        return banner
    }
    catch (error) {
        console.log("error in get banner in controller..!", error);
        throw new Error('enable to create banner error')
    }
};

module.exports = {
    createBanner,
    updateBanner,
    deleteBanner,
    getBannerById,
    getAllBanners

}