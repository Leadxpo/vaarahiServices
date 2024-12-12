const { sequelize } = require('../../db')
const orderModel = require('../../model/orders')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../service/response');


// CREATE orderS

const createOrder = async(orderData) => {
    try {
        const newOrder = await orderModel.create(orderData);
        return newOrder;
    }
    catch (error) {
        console.error("Error in create order details in controller", error);
        throw new Error("Error in create order in controller");
    }
};

// UPDATE orderS

const updateOrder = async (order_id, orderData) => {
    console.log("order id : ",order_id);
    console.log("order data : ",orderData);


    try {
        const updateOrder = await orderModel.update(orderData, {
            where: {
                id: order_id
            }
        });
        return updateOrder;
    }
    catch (error) {
        console.error("Error in update order in controller", error);
        throw new Error("Error update order in controller");
    }
};

// GET orderS

const getOrderById = async (order_id) => {
    try {
        const order = await orderModel.findOne({
            where: {
                id: order_id
            }
        })
        return order
    }
    catch (error) {
        console.log("error in get order in controller..!", error);
        throw new Error('enable to create order error')
    }
};

// GET orderS BASED ON CLient ID

const getOrderByuserID = async (userID) => {
    try {
        const order = await orderModel.findAll({
            where: {
                user_id: userID
            }
        })
        return order
    }
    catch (error) {
        console.log("error in get order in controller..!", error);
        throw new Error('enable to create order error')
    }
};

// GET orderS BASED ON CLient ID

const getAssignedOrderByStaffID = async (staffID) => {
    try {
        const order = await orderModel.findAll({
            where: {
                staff_id: staffID,
                status: {
                    [Op.ne]: 'delivery success'
                }
            }
        });
        return order;
    }
    catch (error) {
        console.log("error in get order in controller..!", error);
        throw new Error('enable to create order error')
    }
};

// COUNT ALL orderS

const countAllOrder = async() => {
    try {

        const order = await orderModel.count();
        return order
    }
    catch (error) {
        console.log("error in get order in controller..!", error);
        throw new Error('enable to create order error')
    }
}

// SEARCH orderS

const searchOrderDetails = async(orderData) => {
    try {

        const data = {};
        if(orderData.clientName) {
            data.clientName = orderData.clientName
        }

        if(orderData.Order_id) {
            data.id = orderData.id
        }
        const order = await orderModel.findAll({
            where: data
        });
        return order


    } catch (error) {
        console.log("erorr in search order in controller", error)
        errorResponse("error in search order in controller")
    }
};

module.exports = {
    createOrder,
    updateOrder,
    getOrderById,
    getOrderByuserID,
    getAssignedOrderByStaffID,
    searchOrderDetails,
    countAllOrder
}