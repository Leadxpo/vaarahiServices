const { sequelize,models } = require('../../db')
const brandsModel = require('../../model/brand')(sequelize)
const productModel = require('../../model/product')(sequelize)
// const sub_brandsModel = require('../../model/sub_brands')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../service/response');



productModel.belongsTo(brandsModel, { 
    foreignKey: "brand_id", // This should match the sourceKey in hasMany
    targetKey: "brand_id", // This should match the sourceKey in hasMany
    as: "productDetails", // Renamed from "projectDetails" to match the hasMany alias
});

brandsModel.hasMany(productModel, {
    foreignKey: "brand_id", // This should match the sourceKey in belongsTo
    sourceKey: "brand_id", // This should match the targetKey in belongsTo
    as: "productDetails", // Renamed from "projectDetails" to match the belongsTo alias
});




// GET  Brands

const getBrandsById = async (Id) => {
    try {
        const brand = await brandsModel.findOne({
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

const getBrandwithPagination = async (  page, limit ) => {
    try {
        const offset = (page - 1) * limit; // Calculate offset for pagination
        const brands = await brandsModel.findAll({
            include: [{
                model: productModel,
                as: 'productDetails',
            }],
            limit: limit,   // Limit the number of products per page
            offset: offset, // Pagination offset
        });

        const totalbrands = await brandsModel.count();

        const hasMore = totalbrands > page * limit; // Check if there are more products

        return {
            brands: brands,
            hasMore: hasMore, // Return if there are more products to load
            totalbrands: totalbrands,
        };
    } catch (error) {
        console.log("Error in getting products by category in controller: ", error);
        throw error;
    }
};

// GET ALL  Brands
const getAllBrands = async () => {
    try {

        const brands = await brandsModel.findAll({
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
        const brand = await brandsModel.findAll(
            {
            where: data,
            include: [{
                model: productModel,
                as: 'productDetails',
            }],        }
    );
        return brand


    } catch (error) {
        console.log("erorr in search brands in controller", error)
        errorResponse("error in search brands in controller")
    }
};

module.exports = {
    getBrandsById,
    getAllBrands,
    getBrandwithPagination,
    searchBrandsDetails,

}
