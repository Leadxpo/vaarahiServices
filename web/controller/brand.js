const { sequelize } = require('../../db')
const brandstModel = require('../../model/brand')(sequelize)
const productModel = require('../../model/product')(sequelize)
// const sub_brandsModel = require('../../model/sub_brands')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../service/response');


productModel.belongsTo(brandstModel, {
    foreignKey: "brand_id", // This should match the sourceKey in hasMany
    targetKey: "brand_id", // This should match the sourceKey in hasMany
    as: "productDetails", // Renamed from "projectDetails" to match the hasMany alias
});

brandstModel.hasMany(productModel, {
    foreignKey: "brand_id", // This should match the sourceKey in belongsTo
    sourceKey: "brand_id", // This should match the targetKey in belongsTo
    as: "productDetails", // Renamed from "projectDetails" to match the belongsTo alias
});


// CREATE  Brands

const createBrands = async (brandData) => {
    try {
        const newBrand = await brandstModel.create(brandData);
        return newBrand;
    }
    catch (error) {
        console.error("Error in create brands details in controller", error);
        throw new Error("Error in create brands in controller");
    }
};

// UPDATE  Brands

const updateBrands = async (Id, brandData) => { 
    try {
        const updateBrand = await brandstModel.update(brandData, {
            where: {
                brand_id: Id
            }
        });
        return updateBrand;
    }
    catch (error) {
        console.error("Error in update brands in controller", error);
        throw new Error("Error update brands in controller");
    }
};

// DELETE  Brands

const deleteBrands = async (Id) => {
    try {
        const newBrand = await brandstModel.destroy({
            where: {
                brand_id: Id
            }
        });
        return newBrand;
    }
    catch (error) {
        console.error("Error in delete brands in controller", error);
        throw new Error("Error delete brands in controller");
    }
};

// GET  Brands

const getBrandsById = async (Id) => {
    try {
        const brand = await brandstModel.findOne({
            where: {
                brand_id: Id
            },
            include: [{
                model: productModel,
                as: 'productDetails',
            }],
        })
        return brand
    }
    catch (error) {
        console.log("error in get brands in controller..!", error);
        throw new Error('enable to create brands error')
    }
};

// GET ALL  Brands
const getAllBrands = async () => {
    try {

        const brands = await brandstModel.findAll({
            include: [{
                model: productModel,
                as: 'productDetails',
            }],
        });

        return brands
    }
    catch (error) {
        console.log("error in get brands in controller..!", error);
        throw new Error('unable to get brands error')
    }
}
// SEARCH  Brands

const searchBrandsDetails = async (brandData) => {
    try {

        const data = {};
        if (brandData.name) {
            data.name = brandData.name
        }

        if (brandData.brand) {
            data.name = brandData.brand
        }

        if (brandData.brand_id) {
            data.brand_id = brandData.brand_id
        }
        const brand = await brandstModel.findAll(
            {
            where: data,
            include: [{
                model: productModel,
                as: 'productDetails',
            }],
        }
    );
        return brand


    } catch (error) {
        console.log("erorr in search brands in controller", error)
        errorResponse("error in search brands in controller")
    }
};

module.exports = {
    createBrands,
    updateBrands,
    deleteBrands,
    getBrandsById,
    getAllBrands,
    searchBrandsDetails,

}
