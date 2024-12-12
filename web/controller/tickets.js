const { sequelize } = require('../../db');
const ticketModel = require('../../model/tickets')(sequelize);
const { Op, where } = require("sequelize");
const { errorResponse } = require('../service/response');

const createTicket = async (ticketData) => {
    try {
        const response = await ticketModel.create(ticketData);
        return response;
    } catch (error) {
        console.log("Error in creating ticket in controller.....", error);
        throw error;
    }
};

const updateTicket = async (Id, ticketData) => {
    try {
        const response = await ticketModel.update(ticketData, { where: { id: Id } });
        return response;
    } catch (error) {
        console.log("Error in updating ticket in controller.....", error);
        throw error;
    }
};

const deleteTicket = async (Id) => {
    try {
        const response = await ticketModel.destroy({ where: { id: Id } });
        return response;
    } catch (error) {
        console.log("Error in deleting ticket in controller.....", error);
        throw error;
    }
};

const getTicketById = async (Id) => {
    try {
        const response = await ticketModel.findOne({ where: { id: Id } });
        return response;
    } catch (error) {
        console.log("Error in getting ticket by id in controller.....", error);
        throw error;
    }
};

const getTicketByName = async (ticketName) => {
    try {
        const response = await ticketModel.findOne({ where: { name: ticketName } });
        return response;
    } catch (error) {
        console.log("Error in getting ticket by id in controller.....", error);
        throw error;
    }
};

const getAllTicket = async () => {
    try {
        const response = await ticketModel.findAll();
        return response;
    } catch (error) {
        console.log("Error in getting all tickets in controller.....", error);
        throw error;
    }
};
const getAllTicketByUserID = async (userID) => {
    try {
        const response = await ticketModel.findAll({where:{user_id:userID}});
        return response;
    } catch (error) {
        console.log("Error in getting all tickets in controller.....", error);
        throw error;
    }
};

const searchTicketDetails = async (searchData) => {
    try {
        const data={};
        if (searchData.userID) {
            data.user_id=searchData.userID
        }
        if (searchData.ticket_mode) {
            data.ticket_mode=searchData.ticket_mode
        }
        if (searchData.title) {
            data.title=searchData.title
        }
        const response = await ticketModel.findAll({
            where:data
        });
        return response;
    } catch (error) {
        console.log("Error in searching ticket details in controller.....", error);
        throw error;
    }
};
// const searchTicketDetails = async (searchData) => {
//     try {
//         const response = await ticketModel.findAll({
//             where: {
//                 [Op.or]: [
//                     { Name: { [Op.like]: `%${searchData.query}%` } },
//                     { Description: { [Op.like]: `%${searchData.query}%` } },
//                 ]
//             }
//         });
//         return response;
//     } catch (error) {
//         console.log("Error in searching ticket details in controller.....", error);
//         throw error;
//     }
// };

// const bulkTicketUpload = async (ticketData) => {
//     try {
//         const response = await ticketModel.bulkCreate(ticketData);
//         return response;
//     } catch (error) {
//         console.log("Error in bulk uploading tickets in controller.....", error);
//         throw error;
//     }
// };

module.exports = {
    createTicket,
    updateTicket,
    deleteTicket,
    getTicketById,
    getTicketByName,
    getAllTicket,
    getAllTicketByUserID,
    searchTicketDetails,
};
