const orders_controller = require("../controller/orders");
const product_controller = require("../controller/product");
const recentOrder_controller = require("../controller/recentOrders");
const shortUUID = require('short-uuid');
const axios = require('axios');
const { successResponse, errorResponse } = require("./response")
const { verifyUser, verifyDeliveryStaff } = require("./userVerfication")


const ProductsQty = async (id, qty, price) => {
    console.log("id ===> ", id);
    console.log("qty ===> ", qty);
    console.log("price ===> ", price);
    // Fetch product data and update quantities 
    try {
        const productData = await product_controller.getProductById(id);
        const oldQty = parseInt(productData.stock, 10);
        console.log("oldQty ===> ", oldQty);

        const total_revenue = parseInt(productData.total_revenue, 10);
        console.log("total_revenue ===> ", total_revenue);

        var newQty = oldQty - parseInt(qty, 10);
        console.log("newQty ===> ", newQty);

        const newTotal_revenue = total_revenue + (qty * price);
        console.log("newTotal_revenue ===> ", newTotal_revenue);

        const totalsales = productData.totalsales + qty;
        console.log("totalsales ===> ", totalsales);

        var stockStatus = "inStock"
        if (newQty <= 0) {
            console.log("newQty ===> ", newQty);
            newQty = 0
            stockStatus = "outOfStock"
        }
        console.log("stockStatus ===> ", stockStatus);

        const productBody = { stock: newQty, total_revenue: newTotal_revenue, totalsales: totalsales, stockStatus: stockStatus };
        await product_controller.updateProduct(productData.id, productBody);
    } catch (error) {
        console.error(`Failed to update product `, error);
    }
}

const AddUsersRecentOrderItem = async (proData, orderID, userID) => {
    if (proData) {
        const recentOrderItemBody = { product_id: proData.product_id, name: proData.product_name, variant_id: proData.variant_id, order_id: orderID, user_id: userID, image: proData.image, category_id: proData.category_id, category: proData.category, brand_id: proData.brand_id, brand: proData.brand, price: proData.price, description: proData.description, units: proData.units, weight: proData.weight, product_discount: proData.product_discount }
        await recentOrder_controller.createRecentOrder(recentOrderItemBody)
    }
}

// Wait for all product updates to complete
const generateOTP = () => {
    // Generate a random OTP
    return Math.floor(1000 + Math.random() * 9000).toString(); // Generates a 6-digit OTP
};


const sendOrderSMS = async (phoneNumber, userName, order_id, Paid_amt, date_time_slot) => {
    console.log("phone_no",phoneNumber);
    console.log("userName",userName);
    console.log("id",order_id);
    console.log("paid_amt",Paid_amt);
    console.log("date_time_slot",date_time_slot);
    try {
        // If OTP is successfully updated in the database, send the OTP via SMS Gateway
        const smsApiUrl = `http://control.yourbulksms.com/api/sendhttp.php?authkey=31386c2e636f6d35383593&mobiles=${phoneNumber}&message=Dear ${userName}, Your order ${order_id} has been successfully placed with Vaarahi Mart! Order Amount: ${Paid_amt} , Expected Delivery: ${date_time_slot} Thank you for shopping with us! For any queries, feel free to contact us at 9692000170 . Happy Shopping! Vaarahi Mart Team&sender=VAAMAR&route=2&country=91&DLT_TE_ID=1707172830496042265`;
        const smsResponse = await axios.get(smsApiUrl);
        if (smsResponse.data.Status === "Success") {
            console.log("order info sent successfully via SMS Gateway to user phoneNo:",phoneNumber);
            return true; // OTP sent successfully
        } else {
            console.error("Failed to send OTP via SMS Gateway:", smsResponse.data);
            return false; // Failed to send OTP via SMS
        }
        // http://control.yourbulksms.com/api/sendhttp.php?authkey=31386c2e636f6d35383593&mobiles=9494130830&message=Dear ravi, Your order 30 has been successfully placed with Vaarahi Mart! Order Amount: 300 , Expected Delivery: 19/11/2024 Thank you for shopping with us! For any queries, feel free to contact us at 9692000170 . Happy Shopping! Vaarahi Mart Team&sender=VAAMAR&route=2&country=91&DLT_TE_ID=1707172830496042265;
    } catch (error) {
        console.error("Failed to send OTP:", error);
        return false; // Return false if there was an error
    }
};


// CREATE orderS

const createOrder = async (orderData) => {
    try {
        var userName = "";
        const translator = shortUUID();
        const transistionID = translator.new();
        orderData.body.TransactionID = transistionID;
        orderData.body.otp = await generateOTP()
        const userVerifyStatus = await verifyUser(orderData.body.userID)
        if (userVerifyStatus) {

            const response = await orders_controller.createOrder(orderData.body);
            if (response.order_items) {
                response.order_items.map(async (item) => {
                    await ProductsQty(item.product_id, item.qty, item.price);
                    await AddUsersRecentOrderItem(item, response.id, orderData.body.userID)
                })
            }
            if (response.name) {
                userName = response.name;
            } else {
                userName = "Customer"
            }
            await sendOrderSMS(response.phone_no, userName, response.id, response.paid_amt, response.date_time_slot)
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
        const userVerifyStatus = await verifyUser(orderData.body.userID)
        if (userVerifyStatus) {
            const updatedData = await orders_controller.updateOrder(orderData.body.id, orderData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update order in servicess.....!", error)
        return errorResponse("Error in update order in servicess")
    }
};

// GET orderS BY ID

const getOrderById = async (orderData) => {
    try {
        const userVerifyStatus = await verifyUser(orderData.body.userID)
        if (userVerifyStatus) {
            const response = await orders_controller.getOrderById(orderData.body.id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id order in  servicess.....!", error)
        return errorResponse("Error in get by id order in servicess")
    }
};

// GET orderS BY client PhoneNo

const getOrderByuserID = async (orderData) => {
    try {
        const userVerifyStatus = await verifyUser(orderData.body.userID)
        if (userVerifyStatus) {
            const response = await orders_controller.getOrderByuserID(orderData.body.userID)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id order in  servicess.....!", error)
        return errorResponse("Error in get by id order in servicess")
    }
};

// GET orderS BY client PhoneNo

const getAssignedOrderByStaffID = async (orderData) => {
    try {
        const staffVerifyStatus = await verifyDeliveryStaff(orderData.body.staffID)
        if (staffVerifyStatus) {
            const response = await orders_controller.getAssignedOrderByStaffID(orderData.body.staffID)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id order in  servicess.....!", error)
        return errorResponse("Error in get by id order in servicess")
    }
};

// COUNT ALL orderS

const countAllOrder = async (orderData) => {
    try {
        const userVerifyStatus = await verifyUser(orderData.body.userID)
        if (userVerifyStatus) {
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
        const userVerifyStatus = await verifyUser(orderData.body.userID)
        if (userVerifyStatus) {
            const Response = await orders_controller.searchOrderDetails(orderData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search order in  servicess.....!", error)
        return errorResponse("Error in search order in  servicess")
    }
};


module.exports = {
    createOrder,
    updateOrder,
    getOrderById,
    searchOrderDetails,
    getOrderByuserID,
    getAssignedOrderByStaffID,
    countAllOrder
}