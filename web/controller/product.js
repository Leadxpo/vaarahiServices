const { sequelize } = require('../../db');
const productModel = require('../../model/product')(sequelize);
const { Op } = require("sequelize");
const { errorResponse } = require('../service/response');

const createProduct = async (productData) => {
    try {
        const response = await productModel.create(productData);
        return response;
    } catch (error) {
        console.log("Error in creating product in controller.....", error);
        throw error;
    }
};

const updateProduct = async (Id, productData) => {
    try {
        const response = await productModel.update(productData, { where: { id: Id } });
        return response;
    } catch (error) {
        console.log("Error in updating product in controller.....", error);
        throw error;
    }
};

const deleteProduct = async (Id, productData) => {
    try {
        const response = await  productModel.update(productData,{ where: { id: Id } });
        return response;
    } catch (error) {
        console.log("Error in deleting product in controller.....", error);
        throw error;
    }
};

const getProductById = async (Id) => {
    try {
        const response = await productModel.findOne({ where: { id: Id } });
        return response;
    } catch (error) {
        console.log("Error in getting product by id in controller.....", error);
        throw error;
    }
};
const getProductByWishlist = async (Id) => {
    try {
        const response = await productModel.findOne({ where: { id: Id } });
        return response;
    } catch (error) {
        console.log("Error in getting product by id in controller.....", error);
        throw error;
    }
};

const getProductByName = async (productName) => {
    try {
        const response = await productModel.findOne({ where: { name: productName } });
        return response;
    } catch (error) {
        console.log("Error in getting product by id in controller.....", error);
        throw error;
    }
};

const getAllProduct = async () => {
    try {
        const response = await productModel.findAll();
        return response;
    } catch (error) {
        console.log("Error in getting all products in controller.....", error);
        throw error;
    }
};

const searchProductDetails = async (searchData) => {
    try {
        const response = await productModel.findAll({
            where: {
                [Op.or]: [
                    { Name: { [Op.like]: `%${searchData.query}%` } },
                    { Description: { [Op.like]: `%${searchData.query}%` } },
                ]
            }
        });
        return response;
    } catch (error) {
        console.log("Error in searching product details in controller.....", error);
        throw error;
    }
};

// const bulkProductUpload = async (productData) => {
//     try {
//         const response = await productModel.bulkCreate(productData);
//         return response;
//     } catch (error) {
//         console.log("Error in bulk uploading products in controller.....", error);
//         throw error;
//     }
// };

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductByName,
    getProductByWishlist,
    getAllProduct,
    searchProductDetails,
};
