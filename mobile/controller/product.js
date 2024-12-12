const { sequelize } = require('../../db');
const productModel = require('../../model/product')(sequelize);
const { Op, where } = require("sequelize");
const { errorResponse } = require('../service/response');


const updateProduct = async (Id, productData) => {
    try {
        const response = await productModel.update(productData, { where: { id: Id } });
        return response;
    } catch (error) {
        console.log("Error in updating product in controller.....", error);
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
const getProductByWishlist = async (wishlist) => {
    try {
        const response = await productModel.findAll({
            where:{
                id:wishlist
            }
        });
        return response;
    } catch (error) {
        console.log("Error in getting all products in controller.....", error);
        throw error;
    }
};

const getProductsByCategorywithPagination = async ( category, page, limit ) => {
    try {
        const offset = (page - 1) * limit; // Calculate offset for pagination
        const products = await productModel.findAll({
            where: {
                category: category, // Filter by category
            },
            limit: limit,   // Limit the number of products per page
            offset: offset, // Pagination offset
        });

        const totalProducts = await productModel.count({
            where: { category: category }, // Count the total products in the category
        });

        const hasMore = totalProducts > page * limit; // Check if there are more products

        return {
            products: products,
            hasMore: hasMore, // Return if there are more products to load
            totalProducts: totalProducts,
        };
    } catch (error) {
        console.log("Error in getting products by category in controller: ", error);
        throw error;
    }
};

const getProductVariants = async (productID) => {
    try {
        const response = await productModel.findAll({ where: { product_id: productID } });
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

module.exports = {
    updateProduct,
    getProductById,
    getProductByWishlist,
    getProductByName,
    getAllProduct,
    getProductsByCategorywithPagination,
    getProductVariants,
    searchProductDetails,
};
