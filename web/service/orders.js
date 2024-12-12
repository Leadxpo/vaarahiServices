const orders_controller = require("../controller/orders");
const client_controller = require("../controller/users");
const shortUUID = require('short-uuid');
const { generateAccessToken,
    generateRefreshToken,
    verifyToken } = require("./jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")
const ExcelJS = require('exceljs');

const generateExcelFile = async (orders) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Orders');

    // Define columns
    worksheet.columns = [
        { header: 'ID', key: 'id', width: 15 },
        { header: 'User_id', key: 'user_id', width: 30 },
        { header: 'Name', key: 'name', width: 15 },
        { header: 'phone_no', key: 'phone_no', width: 20 },
        { header: 'Transaction_id', key: 'Transaction_id', width: 15 },
        { header: 'payment_mode', key: 'payment_mode', width: 15 },
        { header: 'Qty', key: 'qty', width: 15 },
        { header: 'price', key: 'paid_amt', width: 15 },
        { header: 'Date', key: 'createdAt', width: 20 },
        // Add other columns as needed
    ];

    // Add rows
    orders.forEach(order => {
        worksheet.addRow({
            id: order.id,
            clientName: order.clientName,
            price: order.price,
            qty: order.qty,
            createdAt: order.createdAt.toISOString()
        });
    });

    // Write to buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

const ProductsQty = async (name, qty) => {
    // Collect all product updates to handle them in parallel
    const productUpdates = [];
    // Fetch product data and update quantities
    productUpdates.push((async () => {
        try {
            const productData = await product_controller.getProductByName(name);
            const oldQty = parseInt(productData.qty, 10);
            const newQty = oldQty - parseInt(qty, 10);
            const qtyBody = { qty: newQty };
            await product_controller.updateProduct(productData.id, qtyBody);
        } catch (error) {
            console.error(`Failed to update product ${name}:`, error);
        }
    })());
}

// Wait for all product updates to complete


// CREATE orderS

const createOrder = async (orderData) => {
    try {

        const translator = shortUUID();
        const transistionID = translator.new();
        orderData.body.TransactionID = transistionID;

        const token = orderData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role == "admin") {
            const response = await orders_controller.createOrder(orderData.body);

            return successResponse(response);
        }
    }
    catch (error) {
        console.log("Error in create order in services..", error)
        return errorResponse("Error in create order in services..")
    }
}

// UPDATE orderS

const updateOrder = async (orderData) => {
    try {
        const token = orderData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
            const updatedData = await orders_controller.updateOrder(orderData.body.id, orderData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update order in servicess.....!", error)
        return errorResponse("Error in update order in servicess")
    }
};



const deleteOrder = async (orderData) => {
    try {
        const token = orderData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
            const deletedData = await orders_controller.deleteOrder(orderData.body.id)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete order in  servicess.....!", error)
        return errorResponse("Error in delete order in servicess")
    }
};

// GET orderS BY ID

const getOrderById = async (orderData) => {
    try {
        const token = orderData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
            const response = await orders_controller.getOrderById(orderData.body.id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id order in  servicess.....!", error)
        return errorResponse("Error in get by id order in servicess")
    }
};

// GET orderS BY client PhoneNo

const getOrderByUserID = async (orderData) => {
    try {
        const token = orderData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
            const response = await orders_controller.getOrderByUserID(orderData.body.user_id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id order in  servicess.....!", error)
        return errorResponse("Error in get by id order in servicess")
    }
};

// GET ALL orderS

const getAllOrder = async (orderData) => {
    try {
        const token = orderData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
            const response = await orders_controller.getAllOrder()
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all order in servicess.....!", error)
        return errorResponse("Error in get all order in servicess")
    }
};

// COUNT ALL orderS

const countAllOrder = async (orderData) => {
    try {
        const token = orderData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role == "admin") {
            const response = await orders_controller.countAllOrder(orderData.body)
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all order in servicess.....!", error)
        return errorResponse("Error in get all order in servicess")
    }
};

// SEARCH orderS DETAILS

const searchOrderDetails = async (orderData) => {
    try {
        const token = orderData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role === "admin") {
            const Response = await orders_controller.searchOrderDetails(orderData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search order in  servicess.....!", error)
        return errorResponse("Error in search order in  servicess")
    }
};
const excelOrder = async (orderData) => {
    try {
        const orderDatas = orderData.body; // Assuming body contains the necessary filters
        const orders = await orders_controller.searchOrderDetails(orderDatas);

        if (!orders || orders.length === 0) {
            return res.status(404).send("No orders found");
        }

        const excelBuffer = await generateExcelFile(orders);
        return excelBuffer
        // Set headers and send file

    } catch (error) {
        console.log("Error in downloading order details", error);
        res.status(500).send("Error in downloading order details");
    }
};


module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderById,
    getAllOrder,
    searchOrderDetails,
    excelOrder,
    getOrderByUserID,
    countAllOrder
}