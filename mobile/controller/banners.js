const { sequelize } = require('../../db')
const bannerModel = require('../../model/banner')(sequelize)

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
    updateBanner,
    getBannerById,
    getAllBanners

}