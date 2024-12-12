const ticket_controller = require("../controller/tickets");
const shortUUID = require('short-uuid');
const {  verifyToken } = require("../service/jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")

// CREATE PRODUCT

const createTicket = async (ticketData) => {
    try {
        const token = ticketData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin" || decodedData.role === "user" || decodedData.role === "deliveryPartner") {

            if (ticketData.file) {
                ticketData.body.TicketPic = ticketData.file.filename
            }

            const response = await ticket_controller.createTicket(ticketData.body);
            return successResponse(response);
        }
    }
    catch (error) {
        console.log("Error in create ticket in services..", error)
        return errorResponse("Error in ticket cart in services..")
    }
}

// UPDATE PRODUCT

const updateTicket = async (ticketData) => {
    try {
        const token = ticketData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin" || decodedData.role === "user" || decodedData.role === "deliveryPartner") {

            if (ticketData.file) {
                const getTicketDate = await ticket_controller.getTicketById(ticketData.body.id)

                if (getTicketDate.TicketPic !== null) {
                    await deleteImage(getTicketDate.TicketPic)
                    ticketData.body.TicketPic = ticketData.file.filename
                }
                else {
                    ticketData.body.TicketPic = ticketData.file.filename
                }
            }
            const updatedData = await ticket_controller.updateTicket(ticketData.body.id, ticketData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update ticket in servicess.....!", error)
        return errorResponse("Error in update ticket in servicess")
    }
};

// DELETE PRODUCT

const deleteTicket = async (ticketData) => {
    try {
        const token = ticketData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }

        if (decodedData.role === "admin" || decodedData.role === "user" || decodedData.role === "deliveryPartner") {
            const deletedData = await ticket_controller.deleteTicket(ticketData.body.id)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete ticket in  servicess.....!", error)
        return errorResponse("Error in delete ticket in servicess")
    }
};

// GET PRODUCT BY ID

const getTicketById = async (ticketData) => {
    try {
        const token = ticketData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin" || decodedData.role === "user" || decodedData.role === "deliveryPartner") {
            const response = await ticket_controller.getTicketById(ticketData.body.id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id ticket in  servicess.....!", error)
        return errorResponse("Error in get by id ticket in servicess")
    }
};

// GET ALL PRODUCT

const getAllTicket = async (ticketData) => {
    try {
        const token = ticketData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
            const response = await ticket_controller.getAllTicket(ticketData.body)
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all ticket in servicess.....!", error)
        return errorResponse("Error in get all ticket in servicess")
    }
};

const getAllTicketByUserID = async (ticketData) => {
    try {
        const token = ticketData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.id === ticketData.body.userID) {
            const response = await ticket_controller.getAllTicketByUserID(ticketData.body.userID)
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all ticket in servicess.....!", error)
        return errorResponse("Error in get all ticket in servicess")
    }
};

// SEARCH PRODUCT DETAILS

const searchTicketDetails = async (ticketData) => {
    try {
        const token = ticketData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin" || decodedData.role === "user" || decodedData.role === "deliveryPartner") {
            const Response = await ticket_controller.searchTicketDetails(ticketData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search ticket in  servicess.....!", error)
        return errorResponse("Error in search ticket in  servicess")
    }
};

const searchTicketDetailsByUserID = async (ticketData) => {
    try {
        const token = ticketData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.id === ticketData.body.userID) {
            const Response = await ticket_controller.searchTicketDetails(ticketData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search ticket in  servicess.....!", error)
        return errorResponse("Error in search ticket in  servicess")
    }
};


module.exports = {
    createTicket,
    updateTicket,
    deleteTicket,
    getTicketById,
    getAllTicket,
    getAllTicketByUserID,
    searchTicketDetailsByUserID,
    searchTicketDetails


}