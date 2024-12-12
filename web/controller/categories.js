const { sequelize } = require('../../db')
const categoriestModel = require('../../model/categories')(sequelize)
const productModel = require('../../model/product')(sequelize)
// const sub_categoriesModel = require('../../model/sub_categories')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../service/response');


// sub_categoriesModel.belongsTo(categoriestModel, {
//     foreignKey: "categories_id", // This should match the sourceKey in hasMany
//     targetKey: "categories_id", // This should match the sourceKey in hasMany
//     as: "sub_categories_details", // Renamed from "projectDetails" to match the hasMany alias
// });

// categoriestModel.hasMany(sub_categoriesModel, {
//     foreignKey: "categories_id", // This should match the sourceKey in belongsTo
//     sourceKey: "categories_id", // This should match the targetKey in belongsTo
//     as: "sub_categories_details", // Renamed from "projectDetails" to match the belongsTo alias
// });

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


// CREATE  CATEGORIES

const createCategories = async (categoryData) => {
    try {
        const newCategory = await categoriestModel.create(categoryData);
        return newCategory;
    }
    catch (error) {
        console.error("Error in create categories details in controller", error);
        throw new Error("Error in create categories in controller");
    }
};

// UPDATE  CATEGORIES

const updateCategories = async (Id, categoryData) => {
    try {
        const updateCategory = await categoriestModel.update(categoryData, {
            where: {
                category_id: Id 
            }
        });
        return updateCategory;
    }
    catch (error) {
        console.error("Error in update categories in controller", error);
        throw new Error("Error update categories in controller");
    }
};

// DELETE  CATEGORIES

const deleteCategories = async (Id) => {
    try {
        const newCategory = await categoriestModel.destroy({
            where: {
                category_id: Id
            }
        });
        return newCategory;
    }
    catch (error) {
        console.error("Error in delete categories in controller", error);
        throw new Error("Error delete categories in controller");
    }
};

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
            }],
        }
    );
        return category


    } catch (error) {
        console.log("erorr in search categories in controller", error)
        errorResponse("error in search categories in controller")
    }
};

module.exports = {
    createCategories,
    updateCategories,
    deleteCategories,
    getCategoriesById,
    getAllCategories,
    searchCategoriesDetails,

}
