const { sequelize,models } = require('../../db')
const categoriestModel = require('../../model/categories')(sequelize)
const productModel = require('../../model/product')(sequelize)
// const sub_categoriesModel = require('../../model/sub_categories')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../service/response');



productModel.belongsTo(categoriestModel, {
    foreignKey: "category_id", // This should match the sourceKey in hasMany
    targetKey: "category_id", // This should match the sourceKey in hasMany
    as: "productDetails", // Renamed from "projectDetails" to match the hasMany alias
});

categoriestModel.hasMany(productModel, {
    foreignKey: "category_id", // This should match the sourceKey in belongsTo
    sourceKey: "category_id", // This should match the targetKey in belongsTo
    as: "productDetails", // Renamed from "projectDetails" to match the belongsTo alias
});




// GET  CATEGORIES

const getCategoriesById = async (Id) => {
    try {
        const category = await categoriestModel.findOne({
            where: {
                category_id: Id
            },
            include: [{
                model: productModel,
                as: 'productDetails',
            }],
        })
        return category
    }
    catch (error) {
        console.log("error in get categories in controller..!", error);
        throw new Error('enable to create categories error')
    }
};

// GET ALL  CATEGORIES
const getAllCategories = async () => {
    try {

        const categories = await categoriestModel.findAll({
            include: [{
                model: productModel,
                as: 'productDetails',
            }],
        });

        return categories
    }
    catch (error) {
        console.log("error in get categories in controller..!", error);
        throw new Error('unable to get categories error')
    }
}

const getCategorywithPagination = async ( page, limit ) => {
    try {
        const offset = (page - 1) * limit; // Calculate offset for pagination
        const categories = await categoriestModel.findAll({
            limit: limit,   // Limit the number of products per page
            offset: offset, // Pagination offset
        });

        const totalCategories = await categoriestModel.count();

        const hasMore = totalCategories > page * limit; // Check if there are more products

        return {
            categories: categories,
            hasMore: hasMore, // Return if there are more products to load
            totalCategories: totalCategories,
        };
    } catch (error) {
        console.log("Error in getting products by category in controller: ", error);
        throw error;
    }
};

// SEARCH  CATEGORIES

const searchCategoriesDetails = async (categoryData) => {
    try {

        const data = {};
        if (categoryData.name) {
            data.name = categoryData.name
        }

        if (categoryData.category) {
            data.name = categoryData.category
        }

        if (categoryData.category_id) {
            data.category_id = categoryData.category_id
        }
        const category = await categoriestModel.findAll(
            {
            where: data,
            include: [{
                model: productModel,
                as: 'productDetails',
            }],        }
    );
        return category


    } catch (error) {
        console.log("erorr in search categories in controller", error)
        errorResponse("error in search categories in controller")
    }
};

module.exports = {
    getCategoriesById,
    getAllCategories,
    getCategorywithPagination,
    searchCategoriesDetails,

}
